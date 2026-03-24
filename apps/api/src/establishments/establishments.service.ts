import { Injectable } from '@nestjs/common';
import { Establishment } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';

@Injectable()
export class EstablishmentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Establishment[]> {
    return this.prisma.establishment.findMany({ orderBy: { name: 'asc' } });
  }

  create(dto: CreateEstablishmentDto): Promise<Establishment> {
    return this.prisma.establishment.create({ data: dto });
  }
}
