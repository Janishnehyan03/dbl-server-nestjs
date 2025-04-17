import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DivisionService } from './divisions.service';
import { Division } from './division.schema';

@Controller('divisions')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  async create(@Body('name') name: string): Promise<Division> {
    return this.divisionService.create(name);
  }

  @Get()
  async findAll(): Promise<Division[]> {
    return this.divisionService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Division> {
    return this.divisionService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body('name') name: string): Promise<Division> {
    return this.divisionService.update(id, name);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Division> {
    return this.divisionService.delete(id);
  }
}
