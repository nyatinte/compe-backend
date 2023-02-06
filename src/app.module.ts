import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { PrismaService } from './prisma/prisma.service'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { DateResolver, DateTimeResolver, EmailAddressResolver, URLResolver } from 'graphql-scalars'
import { CompetitionModule } from './competition/competition.module'
import { Raw, Request } from '@node-libraries/nest-apollo-server'
import { decode } from 'next-auth/jwt'
import prisma from './client/prisma'

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
      resolvers: {
        Date: DateResolver,
        DateTime: DateTimeResolver,
        EmailAddress: EmailAddressResolver,
        URL: URLResolver,
      },
      context: async ({ req }: { req: Request }) => {
        try {
          const r = Raw(req)
          const token = r.headers['authorization']
          const decodedToken = await decode({
            token: token.replace('Bearer ', ''),
            secret: process.env.NEXTAUTH_SECRET,
          })

          const user = await prisma.user.findUnique({
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
