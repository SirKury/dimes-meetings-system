import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Participant } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RequestUser } from '../common/types/request-user.type';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { QueryParticipantsDto } from './dto/query-participants.dto';
import { ParticipantsService } from './participants.service';

@Controller('participants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  findAll(@CurrentUser() user: RequestUser, @Query() query: QueryParticipantsDto): Promise<Participant[]> {
    return this.participantsService.findAll(user, query);
  }

  @Post()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  create(@CurrentUser() user: RequestUser, @Body() dto: CreateParticipantDto): Promise<Participant> {
    return this.participantsService.create(user, dto);
  }
}
