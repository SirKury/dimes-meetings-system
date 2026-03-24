import { Injectable } from '@nestjs/common';
import { handlePrismaCreateError } from '../common/prisma-error.util';
import { hashPassword } from '../common/security/password.util';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<unknown[]> {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findByEmail(email: string): Promise<any | null> {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { role: { select: { name: true } } }
    });
  }

  async create(dto: CreateUserDto): Promise<unknown> {
    const passwordHash = await hashPassword(dto.password);
    const data = {
      email: dto.email.toLowerCase(),
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      isActive: dto.isActive ?? true,
      role: { connect: { id: dto.roleId } },
      establishment: { connect: { id: dto.establishmentId } }
    };

    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      handlePrismaCreateError(error, 'user');
    }
  }
}
