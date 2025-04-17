import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.schema';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('permissions') permissions: string[],
  ): Promise<Role> {
    return this.roleService.create(name, permissions);
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Role> {
    return this.roleService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('permissions') permissions: string[],
  ): Promise<Role> {
    return this.roleService.update(id, name, permissions);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Role> {
    return this.roleService.delete(id);
  }
}
