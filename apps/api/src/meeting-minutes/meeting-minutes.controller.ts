import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MeetingMinute } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { CreateMeetingMinuteDto } from './dto/create-meeting-minute.dto';
import { UpdateMeetingMinuteDto } from './dto/update-meeting-minute.dto';
import { MeetingMinutesService } from './meeting-minutes.service';

@UseGuards(JwtAuthGuard)
@Controller('meeting-minutes')
export class MeetingMinutesController {
  constructor(private readonly meetingMinutesService: MeetingMinutesService) {}

  @Get()
  findByMeetingId(
    @Query('meetingId') meetingId: string,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<MeetingMinute | null> {
    return this.meetingMinutesService.findByMeetingId(meetingId, user);
  }

  @Post()
  create(
    @Body() dto: CreateMeetingMinuteDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<MeetingMinute> {
    return this.meetingMinutesService.create(dto, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMeetingMinuteDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<MeetingMinute> {
    return this.meetingMinutesService.update(id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<MeetingMinute> {
    return this.meetingMinutesService.remove(id, user);
  }
}
