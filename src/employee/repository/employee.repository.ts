import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly connection: Connection) {}

  async findOne(id: number) {
    try {
      const query = `SELECT * FROM employees WHERE employee_id = ${id}`;
      const result = await this.connection.query(query);
      return result;
    } catch {
      throw new NotFoundException('error while finding alarm');
      // 페이지 또는 파일을 찾을 수 없음 404
    }
  }
}