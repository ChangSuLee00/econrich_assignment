import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SidoName } from '../interfaces/sidoName.type';
import axios from 'axios';

@Injectable()
export class AirRepository {
  constructor(private readonly connection: DataSource) {}

  async findAirBySidoName(query: SidoName): Promise<any> {
    const serviceKey = process.env.serviceKey;
    const sidoName = encodeURI(query.sidoName);
    const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${sidoName}&pageNo=1&numOfRows=100&returnType=json&serviceKey=${serviceKey}`;
    try {
      const response = await axios.get(url);
      return response.data.response.body.items;
    } catch (error) {
      throw new InternalServerErrorException('error while find air condition');
      // 페이지 또는 파일을 찾을 수 없음 404
    }
  }
}
