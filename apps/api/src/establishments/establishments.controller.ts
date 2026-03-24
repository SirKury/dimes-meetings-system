import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Establishment } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { EstablishmentsService } from './establishments.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPERADMIN')
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
