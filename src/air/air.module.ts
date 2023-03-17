import { Module } from '@nestjs/common';
import { AirService } from './air.service';
import { AirController } from './air.controller';
import { AirRepository } from './repository/employee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'src/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig)],
  controllers: [AirController],
  providers: [AirService, AirRepository],
})
export class AirModule {}
