import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import nextAuth from 'next-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await nextAuth(app.getHttpServer());
  await app.listen(4000);
}
bootstrap();
