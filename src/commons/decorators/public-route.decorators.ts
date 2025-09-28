import { CustomDecorator, SetMetadata } from '@nestjs/common';

export function PublicRouteDecorator(isPublic = true): CustomDecorator {
  return SetMetadata('public_route', isPublic);
}
