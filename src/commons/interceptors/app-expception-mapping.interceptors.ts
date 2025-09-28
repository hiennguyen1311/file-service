import { Constructor, ErrorException } from '@models';
import {
  type CallHandler,
  type ExecutionContext,
  type HttpStatus,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';

export interface DomainToHttpMapping {
  httpStatus: HttpStatus;
  exceptions: Array<Constructor<ErrorException>>;
}

@Injectable()
export class AppExceptionMappingInterceptor implements NestInterceptor {
  constructor(private readonly mapping: DomainToHttpMapping[]) {}

  public intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error: Error) => {
        if (!(error instanceof ErrorException)) {
          throw error;
        }

        for (const { httpStatus, exceptions } of this.mapping) {
          for (const exceptionClass of exceptions) {
            if (error instanceof exceptionClass) {
              error.statusCode = httpStatus;

              throw error;
            }
          }
        }

        throw error;
      }),
    );
  }
}
