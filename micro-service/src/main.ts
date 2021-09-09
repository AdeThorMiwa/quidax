import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import dotenv from 'dotenv';
dotenv.config();
import AppModules from '@modules';
import { useContainer } from 'class-validator';
import GlobalExceptionHandler from './exception';

let app: INestMicroservice;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

process.on('SIGTERM', (reason) => {
  app.close();
});

async function bootstrap() {
  const { HOST, PORT } = process.env;
  const microservicesOptions: any = {
    transport: Transport.TCP,
    options: {
      host: HOST,
      port: PORT,
    },
  };
  app = await NestFactory.createMicroservice(AppModules, microservicesOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  useContainer(app.select(AppModules), { fallbackOnErrors: true });
  app.useGlobalFilters(new GlobalExceptionHandler());

  app.listen(() => console.log(`App is listening on http://localhost:${PORT}`));
}

bootstrap();
