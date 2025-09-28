import {
  AppExceptionMappingInterceptor,
  type DomainToHttpMapping,
} from '../interceptors';
import { applyDecorators, UseInterceptors } from '@nestjs/common';

export function MapException(mapping: DomainToHttpMapping[]) {
  return applyDecorators(
    UseInterceptors(new AppExceptionMappingInterceptor(mapping)),
  );
}
