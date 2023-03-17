import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DepartmentRepository {
  constructor(private readonly connection: DataSource) {}

  async findOne(id: number) {
    try {
    } catch (error) {
      throw new NotFoundException('error while find department');
      // 페이지 또는 파일을 찾을 수 없음 404
    }
  }
}
