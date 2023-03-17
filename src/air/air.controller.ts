import { Controller, Get, Query } from '@nestjs/common';
import { AirService } from './air.service';

@Controller('air')
export class AirController {
  constructor(private readonly airService: AirService) {}

  @Get('')
  findAirBySidoName(@Query() query: { sidoName: string }): Promise<any> {
    return this.airService.findAirBySidoName(query.sidoName);
  }
}
