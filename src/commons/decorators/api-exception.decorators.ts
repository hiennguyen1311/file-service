import { uuid } from '@utils';
import { ErrorException } from '@models';
import { applyDecorators, HttpException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

type Status = number | 'default' | '1XX' | '2XX' | '3XX' | '4XX' | '5XX';

interface AppExceptionOptions {
  type: 'AppException';
  status: Status;
  description?: string;
  exception: ErrorException;
}

interface CommonHttpExceptionOptions {
  type: 'HttpException';
  status: Status;
  description?: string;
  exception: HttpException;
  code: string;
}

type ApiExceptionItem = AppExceptionOptions | CommonHttpExceptionOptions;

function exceptionToJson(data: ApiExceptionItem) {
  let body = {} as any;

  if (data.exception instanceof HttpException) {
    data = data as CommonHttpExceptionOptions;
    body = {
      id: uuid(),
      message: data.exception.message,
      code: data.code,
      type: data.exception.name,
      url: '{protocol}://{full_url}',
      path: '/path/to/something',
      method: 'GET, POST, PUT, PATCH, DELETE',
      timestamp: new Date(),
    };
  }

  if (data.exception instanceof ErrorException) {
    body = {
      id: uuid(),
      message: data.exception.message,
      code: data.exception.code,
      type: data.exception.constructor.name,
      args: data.exception.args,
      url: '{protocol}://{full_url}',
      path: '/path/to/something',
      method: 'GET, POST, PUT, PATCH, DELETE',
      timestamp: new Date(),
    };
  }

  return {
    content: { description: data.description, value: body },
    title: body.type,
  };
}

export function ApiException(list: ApiExceptionItem[]) {
  const decorators: Array<MethodDecorator & ClassDecorator> = [];
  const mapByStatus: Record<Status, ApiExceptionItem[] | undefined> =
    {} as Record<Status, ApiExceptionItem[]>;

  for (const options of list) {
    const mapValue = mapByStatus[options.status];

    if (mapValue) {
      mapValue.push(options);
      continue;
    }

    mapByStatus[options.status] = [options];
  }

  for (const [status, optionsList] of Object.entries(mapByStatus)) {
    const schemas: Record<
      string,
      {
        description?: string;
        value: unknown;
      }
    > = {};

    for (const options of optionsList!) {
      const parseValue = exceptionToJson(options);
      schemas[parseValue.title] = parseValue.content;
    }

    decorators.push(
      ApiResponse({
        status: status as Status,
        content: {
          'application/json': {
            examples: schemas,
          },
        },
      }),
    );
  }

  return applyDecorators(...decorators);
}
