import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CreateConfigurationDto, UpdateConfigurationDto } from './dto/configuration.dto';

@Controller('configurations')
export class ConfigurationController {
  constructor(private readonly configService: ConfigurationService) {}

  @Post()
  create(@Body() createConfigDto: CreateConfigurationDto) {
    return this.configService.create(createConfigDto);
  }

  @Get()
  findAll() {
    return this.configService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigurationDto) {
    return this.configService.update(id, updateConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configService.remove(id);
  }
}
