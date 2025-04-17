import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.schema';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('description') description: string,
  ): Promise<Permission> {
    return this.permissionService.create(name, description);
  }

  @Get()
  async findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Permission> {
    return this.permissionService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
  ): Promise<Permission> {
    return this.permissionService.update(id, name, description);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Permission> {
    return this.permissionService.delete(id);
  }
}
