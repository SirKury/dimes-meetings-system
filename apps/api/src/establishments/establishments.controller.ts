import { Body, Controller, Get, Post } from '@nestjs/common';
import { Establishment } from '@prisma/client';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { EstablishmentsService } from './establishments.service';

@Controller('establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Get()
  findAll(): Promise<Establishment[]> {
    return this.establishmentsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateEstablishmentDto): Promise<Establishment> {
    return this.establishmentsService.create(dto);
  }
}
