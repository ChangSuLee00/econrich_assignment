import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DepartmentFindOne } from '../interfaces/findDept.type';
import { DepartmentFindLocation } from '../interfaces/findDeptLocation.type';
import { DepartmentUpdateSalary } from '../interfaces/updateDeptSalary.type';

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

  async findLocation(id: number): Promise<DepartmentFindLocation> {
    try {
      const query = `SELECT locations.*
      FROM departments
      JOIN locations 
      ON departments.location_id = locations.location_id
      WHERE departments.department_id = ${id}`;
      const result = await this.connection.query(query);
      return result;
    } catch (error) {
      throw new NotFoundException('error while find department location');
      // 페이지 또는 파일을 찾을 수 없음 404
    }
  }

  async updateSalary(
    id: number,
    body: DepartmentUpdateSalary,
  ): Promise<{ status: number; success: boolean }> {
    const percentage = 1 + Number(body.upper) / 100;
    try {
      const query = `UPDATE employees
      SET salary = salary * ${percentage}
      WHERE department_id = ${id}`;
      const result = await this.connection.query(query);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'error while update department salary',
      );
      // 페이지 또는 파일을 찾을 수 없음 404
    }
  }
}
