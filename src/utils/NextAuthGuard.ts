import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class NextAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { user } = GqlExecutionContext.create(context).getContext()
      return user ? true : false
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
