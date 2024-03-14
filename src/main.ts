import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  // Set up global validation pipe with whitelist option enabled.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Use cookie parser middleware to parse cookies from incoming requests.
  app.use(cookieParser());

  await app.listen(port || 3000);
}
bootstrap();
