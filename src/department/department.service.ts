import { Injectable } from '@nestjs/common';
import { DepartmentUpdateSalary } from './interfaces/updateDeptSalary.type';
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

  async updateSalary(id: number, body: DepartmentUpdateSalary) {
    const location = await this.departmentRepository.updateSalary(id, body);
    if (location) {
      return { status: 200, success: true };
    }
    return { status: 422, success: false };
    // 요청 문법은 맞지만 지시에 따를 수 없음
  }
}
