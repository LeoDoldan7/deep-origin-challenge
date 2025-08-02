import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  Logger, RequestMethod, ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1', { exclude: [
    {
      path   : 'r/:code',
      method : RequestMethod.GET,
    },
  ] }
  );
  const isDev = process.env.NODE_ENV === 'development'
  if (isDev) {
    app.enableCors({
      origin      : 'http://localhost:3000',
      credentials : true,
    });
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist        : true,
      transform        : true,
      transformOptions : { enableImplicitConversion: true },
    })
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);
  const url = await app.getUrl();
  const logger = new Logger('NestApplication');
  logger.log(`Application is running on: ${url}`);
}
bootstrap();
