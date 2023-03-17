import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentFindOne } from './interfaces/findDept.type';
import { DepartmentFindLocation } from './interfaces/findDeptLocation.type';
import { DepartmentUpdateSalary } from './interfaces/updateDeptSalary.type';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DepartmentFindOne> {
    return this.departmentService.findOne(id);
  }

  @Get('location/:id')
  findLocation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DepartmentFindLocation> {
    return this.departmentService.findLocation(id);
  }

  @Patch(':id')
  updateSalary(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DepartmentUpdateSalary,
  ): Promise<{ status: number; success: boolean }> {
    return this.departmentService.updateSalary(id, body);
  }
}
