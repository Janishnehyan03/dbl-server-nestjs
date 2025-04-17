import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DepartmentService } from './departments.service';
import { Department } from './department.schema';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body('name') name: string, @Body('section') section: string): Promise<Department> {
    return this.departmentService.create(name, section);
  }

  @Get()
  async findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Department> {
    return this.departmentService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('section') section: string
  ): Promise<Department> {
    return this.departmentService.update(id, name, section);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Department> {
    return this.departmentService.delete(id);
  }
}
