import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './repository/employee.repository';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }
}
