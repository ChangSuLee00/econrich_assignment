import { Injectable } from '@nestjs/common';
import { SidoName } from './interfaces/sidoName.type';
import { AirRepository } from './repository/employee.repository';

@Injectable()
export class AirService {
  constructor(private readonly airRepository: AirRepository) {}

  async findAirBySidoName(query: SidoName) {
    const airCondition = await this.airRepository.findAirBySidoName(query);
    return airCondition;
  }
}
