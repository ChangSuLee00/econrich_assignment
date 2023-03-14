import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionFiller } from './common/exception/exception.filter';
import { winstonLogger } from './common/utils/logger.winston';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DataSource } from 'typeorm';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLogger,
  });

  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: false,
  });

  await dataSource.initialize();
  app.use(helmet());
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalFilters(new AllExceptionFiller(winstonLogger));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
