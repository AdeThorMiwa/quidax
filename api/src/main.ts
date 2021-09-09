import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import dotenv from 'dotenv';
dotenv.config();
import AppModules from '@modules';
import { useContainer } from 'class-validator';
import GlobalExceptionHandler from './exception';

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModules);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  useContainer(app.select(AppModules), { fallbackOnErrors: true });
  app.useGlobalFilters(new GlobalExceptionHandler());

  const config = new DocumentBuilder()
    .setTitle('Quidax')
    .setDescription('The Quidax Api Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  console.log(`App is listening on http://localhost:${PORT}`);
}

bootstrap();
