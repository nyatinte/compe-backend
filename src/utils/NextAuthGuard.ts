import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class NextAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { session } = request;

    if (!session || !session.user) {
      return false;
    }

    return true;
  }
}
