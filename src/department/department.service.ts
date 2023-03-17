import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './repository/employee.repository';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async findOne(id: number) {
    const department = await this.departmentRepository.findOne(id);
    return department;
  }

  async findLocation(id: number) {
    const location = await this.departmentRepository.findLocation(id);
    return location;
  }
}
