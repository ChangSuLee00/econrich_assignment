import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionFiller } from './common/exception/exception.filter';
import { winstonLogger } from './common/utils/logger.winston';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLogger,
  });
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalFilters(new AllExceptionFiller(winstonLogger));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
