import { Injectable } from '@nestjs/common';
import { EmployeeUpdateOne } from './interfaces/updateOne.type';
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

  async updateOne(id: number, body: EmployeeUpdateOne) {
    const updatedEmployee = await this.employeeRepository.updateOne(id, body);
    if (updatedEmployee) {
      return { status: 200, success: true };
    }
    return { status: 422, success: false };
    // 요청 문법은 맞지만 지시에 따를 수 없음
  }
}
