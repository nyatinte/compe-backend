import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { PrismaService } from './prisma/prisma.service'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { DateTimeResolver } from 'graphql-scalars'
import { CompetitionModule } from './competition/competition.module'
import { Raw, Request } from '@node-libraries/nest-apollo-server'
import { decode } from 'next-auth/jwt'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV !== 'production',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/types/graphql.ts'),
        outputAs: 'class',
      },
      resolvers: { DateTime: DateTimeResolver },
      context: async ({ req }: { req: Request }) => {
        try {
          const r = Raw(req)
          const token = r.headers['authorization']
          const decodedToken = await decode({
            token: token.replace('Bearer ', ''),
            secret: process.env.NEXTAUTH_SECRET,
          })
          const prismaService = new PrismaService()
          const user = await prismaService.user.findUnique({
            where: {
              id: decodedToken.sub,
            },
          })
          return { user }
        } catch {
          return {}
        }
      },
    }),
    PrismaModule,
    UserModule,
    CompetitionModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
