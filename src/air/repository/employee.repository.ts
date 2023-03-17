import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SidoName } from '../interfaces/sidoName.type';

@Injectable()
export class AirRepository {
  constructor(private readonly connection: DataSource) {}

  async findAirBySidoName(query: SidoName): Promise<any> {
    try {
    } catch (error) {
      throw new InternalServerErrorException('error while find air condition');
      // 페이지 또는 파일을 찾을 수 없음 404
    }
  }
}
