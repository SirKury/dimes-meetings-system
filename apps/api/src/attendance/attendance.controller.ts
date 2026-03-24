import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Attendance } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RequestUser } from '../common/types/request-user.type';
import { AttendanceService } from './attendance.service';
import { QueryAttendanceDto } from './dto/query-attendance.dto';
import { RegisterAttendanceDto } from './dto/register-attendance.dto';

@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  listByMeeting(@CurrentUser() user: RequestUser, @Query() query: QueryAttendanceDto): Promise<Attendance[]> {
    return this.attendanceService.listByMeeting(user, query);
  }

  @Post()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  register(@CurrentUser() user: RequestUser, @Body() dto: RegisterAttendanceDto): Promise<Attendance> {
    return this.attendanceService.register(user, dto);
  }
}
