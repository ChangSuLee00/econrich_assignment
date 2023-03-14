import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './repository/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne(id);
    return employee;
  }
}
