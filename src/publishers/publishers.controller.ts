import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { CreatePublisherDto, UpdatePublisherDto } from './dto/publisher.dto';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publishersService.create(createPublisherDto);
  }

  @Get()
  findAll() {
    return this.publishersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublisherDto: UpdatePublisherDto) {
    return this.publishersService.update(id, updatePublisherDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.publishersService.delete(id);
  }
}
