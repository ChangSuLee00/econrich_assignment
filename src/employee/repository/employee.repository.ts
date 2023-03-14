import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EmployeeFindOne } from '../interfaces/findOne.type';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly connection: DataSource) {}

  async findOne(id: number): Promise<EmployeeFindOne> {
    try {
      const query = `SELECT * FROM employees WHERE employee_id = ${id}`;
      const result = await this.connection.query(query);
      return result;
    } catch (error) {
      throw new NotFoundException('error while find employee');
      // 페이지 또는 파일을 찾을 수 없음 404
    }
  }
}
