import { Injectable } from '@nestjs/common';
import { AirRepository } from './repository/employee.repository';

@Injectable()
export class AirService {
  constructor(private readonly airRepository: AirRepository) {}

  async findAirBySidoName(sidoName: string) {
    const airCondition = await this.airRepository.findAirBySidoName(sidoName);
    return airCondition;
  }
}
