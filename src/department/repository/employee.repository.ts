import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DepartmentFindOne } from '../interfaces/findDept.type';

@Injectable()
export class DepartmentRepository {
  constructor(private readonly connection: DataSource) {}

  async findOne(id: number): Promise<DepartmentFindOne> {
    try {
      const query = `SELECT * FROM departments WHERE department_id = ${id}`;
      const result = await this.connection.query(query);
      return result;
    } catch (error) {
      throw new NotFoundException('error while find department');
      // 페이지 또는 파일을 찾을 수 없음 404
    }
  }
}
