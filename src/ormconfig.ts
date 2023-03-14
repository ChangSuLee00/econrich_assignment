import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
};

export default ormconfig;
