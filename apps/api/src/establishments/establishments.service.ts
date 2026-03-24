import { Injectable } from '@nestjs/common';
import { handlePrismaCreateError } from '../common/prisma-error.util';
import { PrismaService } from '../prisma.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';

@Injectable()
export class EstablishmentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<unknown[]> {
    return this.prisma.establishment.findMany({ orderBy: { name: 'asc' } });
  }

  async create(dto: CreateEstablishmentDto): Promise<unknown> {
    try {
      return await this.prisma.establishment.create({ data: dto });
    } catch (error) {
      handlePrismaCreateError(error, 'establishment');
    }
  }
}
