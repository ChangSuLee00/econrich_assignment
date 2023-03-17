import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentFindOne } from './interfaces/findDept.type';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DepartmentFindOne> {
    return this.departmentService.findOne(id);
  }
}
