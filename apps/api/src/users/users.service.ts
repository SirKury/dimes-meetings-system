import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findByEmail(email: string): Promise<(User & { role: { name: string } }) | null> {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { role: { select: { name: true } } }
    });
  }

  create(dto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      email: dto.email.toLowerCase(),
      passwordHash: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      isActive: dto.isActive ?? true,
      role: { connect: { id: dto.roleId } },
      establishment: { connect: { id: dto.establishmentId } }
    };

    return this.prisma.user.create({ data });
  }
}
