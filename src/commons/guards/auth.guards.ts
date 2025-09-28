import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

export function AuthGuard({ isPublic }: { isPublic?: boolean }) {
  const strategies = ['jwt'];

  if (isPublic) {
    strategies.push('public');
  }

  return NestAuthGuard(strategies);
}
