import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { decode } from 'next-auth/jwt'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class NextAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context)

      const {
        req: {
          headers: { authorization: token },
        },
      } = ctx.getContext()
      const decodedToken = await decode({
        token: token.replace('Bearer ', ''),
        secret: process.env.NEXTAUTH_SECRET,
      })
      const prismaService = new PrismaService()
      const user = prismaService.user.findUnique({
        where: {
          id: decodedToken.sub,
        },
      })

      return user ? true : false
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
