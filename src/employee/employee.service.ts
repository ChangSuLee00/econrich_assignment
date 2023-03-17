import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './repository/employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne(id);
    return employee;
  }

  async findOneHistory(id: number) {
    const employeeHistory = await this.employeeRepository.findOneHistory(id);
    return employeeHistory;
  }
}
