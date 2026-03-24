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
import { Attendance } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { SYSTEM_ROLES } from '../auth/types/system-role.type';
import { MeetingIdQueryDto } from '../common/dto/meeting-id-query.dto';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Get()
  findAll(@Query() query: MeetingIdQueryDto, @CurrentUser() user: AuthenticatedUser): Promise<Attendance[]> {
    return this.attendancesService.findAll(query.meetingId, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Post()
  create(@Body() dto: CreateAttendanceDto, @CurrentUser() user: AuthenticatedUser): Promise<Attendance> {
    return this.attendancesService.create(dto, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateAttendanceDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<Attendance> {
    return this.attendancesService.update(id, dto, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @CurrentUser() user: AuthenticatedUser): Promise<Attendance> {
    return this.attendancesService.remove(id, user);
  }
}
