import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Meeting } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RequestUser } from '../common/types/request-user.type';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { QueryMeetingsDto } from './dto/query-meetings.dto';
import { MeetingsService } from './meetings.service';

@Controller('meetings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Get()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  findAll(@CurrentUser() user: RequestUser, @Query() query: QueryMeetingsDto): Promise<Meeting[]> {
    return this.meetingsService.findAll(user, query);
  }

  @Post()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  create(@CurrentUser() user: RequestUser, @Body() dto: CreateMeetingDto): Promise<Meeting> {
    return this.meetingsService.create(user, dto);
  }
}
