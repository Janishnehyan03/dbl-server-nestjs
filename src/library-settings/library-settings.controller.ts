import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LibrarySettingsService } from './library-settings.service';
import { CreateLibrarySettingsDto,UpdateLibrarySettingsDto } from './dto/create-library-settings.dto';

@Controller('library-settings')
export class LibrarySettingsController {
  constructor(private readonly librarySettingsService: LibrarySettingsService) {}

  @Post()
  async create(@Body() createLibrarySettingsDto: CreateLibrarySettingsDto) {
    return this.librarySettingsService.create(createLibrarySettingsDto);
  }

  @Get()
  async findAll() {
    return this.librarySettingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.librarySettingsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLibrarySettingsDto: UpdateLibrarySettingsDto,
  ) {
    return this.librarySettingsService.update(id, updateLibrarySettingsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.librarySettingsService.remove(id);
  }
}