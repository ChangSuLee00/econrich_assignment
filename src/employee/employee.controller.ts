import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeFindHistory } from './interfaces/findHistory.type';
import { EmployeeFindOne } from './interfaces/findOne.type';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EmployeeFindOne> {
    return this.employeeService.findOne(id);
  }

  @Get('history/:id')
  findOneHistory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EmployeeFindHistory> {
    return this.employeeService.findOneHistory(id);
  }
}
