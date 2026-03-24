import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { Meeting } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SYSTEM_ROLES } from '../auth/types/system-role.type';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsService } from './meetings.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser): Promise<Meeting[]> {
    return this.meetingsService.findAll(user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<Meeting> {
    return this.meetingsService.findOne(id, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Post()
  create(@Body() dto: CreateMeetingDto, @CurrentUser() user: AuthenticatedUser): Promise<Meeting> {
    return this.meetingsService.create(dto, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateMeetingDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<Meeting> {
    return this.meetingsService.update(id, dto, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @CurrentUser() user: AuthenticatedUser): Promise<Meeting> {
    return this.meetingsService.remove(id, user);
  }
}
