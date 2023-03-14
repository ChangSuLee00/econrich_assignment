import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeFindOne } from './interfaces/findOne.type';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EmployeeFindOne> {
    return this.employeeService.findOne(id);
  }
}
