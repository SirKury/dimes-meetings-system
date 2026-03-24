import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(dto);
  }
}
