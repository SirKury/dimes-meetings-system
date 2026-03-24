import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Participant } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantsService } from './participants.service';

@UseGuards(JwtAuthGuard)
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get()
  findAll(
    @Query('meetingId') meetingId: string,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<Participant[]> {
    return this.participantsService.findAll(meetingId, user);
  }

  @Post()
  create(
    @Body() dto: CreateParticipantDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<Participant> {
    return this.participantsService.create(dto, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateParticipantDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<Participant> {
    return this.participantsService.update(id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<Participant> {
    return this.participantsService.remove(id, user);
  }
}
