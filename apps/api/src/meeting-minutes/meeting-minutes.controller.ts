import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { SYSTEM_ROLES } from '../auth/types/system-role.type';
import { MeetingIdQueryDto } from '../common/dto/meeting-id-query.dto';
import { CreateMeetingMinuteDto } from './dto/create-meeting-minute.dto';
import { UpdateMeetingMinuteDto } from './dto/update-meeting-minute.dto';
import { MeetingMinutesService } from './meeting-minutes.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('meeting-minutes')
export class MeetingMinutesController {
  constructor(private readonly meetingMinutesService: MeetingMinutesService) {}

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Get()
  findByMeetingId(@Query() query: MeetingIdQueryDto, @CurrentUser() user: AuthenticatedUser): Promise<unknown> {
    return this.meetingMinutesService.findByMeetingId(query.meetingId, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Post()
  create(@Body() dto: CreateMeetingMinuteDto, @CurrentUser() user: AuthenticatedUser): Promise<unknown> {
    return this.meetingMinutesService.create(dto, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateMeetingMinuteDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<unknown> {
    return this.meetingMinutesService.update(id, dto, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @CurrentUser() user: AuthenticatedUser): Promise<unknown> {
    return this.meetingMinutesService.remove(id, user);
  }
}
