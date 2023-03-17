import { Controller, Get, Query } from '@nestjs/common';
import { AirService } from './air.service';
import { SidoName } from './interfaces/sidoName.type';

@Controller('air')
export class AirController {
  constructor(private readonly airService: AirService) {}

  @Get('')
  findAirBySidoName(@Query() query: SidoName): Promise<any> {
    return this.airService.findAirBySidoName(query);
  }
}
