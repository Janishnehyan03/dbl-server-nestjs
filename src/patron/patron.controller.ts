import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { PatronService } from './patron.service';
import { Patron } from './patron.schema';

@Controller('patrons')
export class PatronController {
  constructor(private readonly patronService: PatronService) {}

  // 🔹 Bulk Insert Patrons
  @Post('bulk-insert')
  async createBulk(
    @Body() patrons: { type: string; data: Partial<Patron>[]; metadata: any },
  ): Promise<Patron[]> {
    return this.patronService.createBulk(patrons);
  }

  // 🔹 Get All Patrons (Supports Filtering)
  @Get()
  async findAll(@Query() query: any) {
    return this.patronService.findAll(query);
  }

  // 🔹 Get Patron by ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.patronService.findById(id);
  }

  // Search Patrons by Name or Admission Number
  @Get('search/data')
  async searchPatrons(@Query('search') search: string) {
    return this.patronService.searchPatrons(search);
  }

  // 🔹 Update Patron by ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Patron>) {
    return this.patronService.update(id, updateData);
  }

  // 🔹 Delete Patron by ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.patronService.delete(id);
  }
}
