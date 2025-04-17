import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PermissionCategoryService } from './permission-category.service';
import { PermissionCategory } from './permission-category.schema';

@Controller('permission-categories')
export class PermissionCategoryController {
  constructor(private readonly permissionCategoryService: PermissionCategoryService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('permissions') permissions: string[],
  ): Promise<PermissionCategory> {
    return this.permissionCategoryService.create(name, permissions);
  }

  @Get()
  async findAll(): Promise<PermissionCategory[]> {
    return this.permissionCategoryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PermissionCategory> {
    return this.permissionCategoryService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('permissions') permissions: string[],
  ): Promise<PermissionCategory> {
    return this.permissionCategoryService.update(id, name, permissions);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PermissionCategory> {
    return this.permissionCategoryService.delete(id);
  }
}
