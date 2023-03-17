import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'src/ormconfig';
import { DepartmentRepository } from './repository/employee.repository';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig)],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentRepository],
})
export class DepartmentModule {}
