import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer, ValidationError } from 'class-validator';
import {
  StandardErrorResponse,
  ValidationErrorDetail,
} from './shared/filters/standard-error-response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Bank Project')
    .setDescription('Bank project API for education')
    .setVersion('1.0')
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
      example: {
        statusCode: 500,
        timestamp: '2025-04-27T16:37:48.011Z',
        path: '/api/v1/example',
        method: 'GET',
        errorName: 'InternalServerError',
        message: 'An unexpected error occurred',
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [StandardErrorResponse, ValidationErrorDetail],
  });
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new BadRequestException(validationErrors),
    }),
  );

  // wrap AppModule with UseContainer to force async validation on TypeORM
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
