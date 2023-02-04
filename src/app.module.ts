import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { DogModule } from './dog/dog.module';
import { PrismaModule } from './prisma/prisma.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV !== 'production',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    PrismaModule,
    DogModule,
    OwnerModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
