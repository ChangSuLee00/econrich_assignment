import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeFindHistory } from './interfaces/findHistory.type';
import { EmployeeFindOne } from './interfaces/findOne.type';
import { EmployeeUpdateOne } from './interfaces/updateOne.type';

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

  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: EmployeeUpdateOne,
  ): Promise<{ status: number; success: boolean }> {
    return this.employeeService.updateOne(id, body);
  }
}
