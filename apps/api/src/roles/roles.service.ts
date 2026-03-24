import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { handlePrismaCreateError } from '../common/prisma-error.util';
import { PrismaService } from '../prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Role[]> {
    return this.prisma.role.findMany({ orderBy: { name: 'asc' } });
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    try {
      return await this.prisma.role.create({ data: dto });
    } catch (error) {
      handlePrismaCreateError(error, 'role');
    }
  }
}
