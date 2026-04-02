import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // frontend server
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS',
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
