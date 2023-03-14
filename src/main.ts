import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionFiller } from './common/exception/exception.filter';
import { winstonLogger } from './common/utils/logger.winston';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLogger,
  });
  app.useGlobalFilters(new AllExceptionFiller(winstonLogger));
  await app.listen(5000);
}
bootstrap();
