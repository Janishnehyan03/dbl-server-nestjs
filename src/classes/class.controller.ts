import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from './class.schema';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classService: ClassesService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('section') section: string,
    @Body('division') division: string,
  ): Promise<Class> {
    return this.classService.create(name, section, division);
  }

  @Get()
  async findAll(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Class> {
    return this.classService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('section') section: string,
    @Body('division') division: string,
  ): Promise<Class> {
    return this.classService.update(id, name, section, division);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Class> {
    return this.classService.delete(id);
  }
}
