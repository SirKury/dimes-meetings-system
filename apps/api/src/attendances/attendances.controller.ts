import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Attendance } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@UseGuards(JwtAuthGuard)
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Get()
  findAll(@Query('meetingId') meetingId: string, @CurrentUser() user: AuthenticatedUser): Promise<Attendance[]> {
    return this.attendancesService.findAll(meetingId, user);
  }

  @Post()
  create(@Body() dto: CreateAttendanceDto, @CurrentUser() user: AuthenticatedUser): Promise<Attendance> {
    return this.attendancesService.create(dto, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAttendanceDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<Attendance> {
    return this.attendancesService.update(id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser): Promise<Attendance> {
    return this.attendancesService.remove(id, user);
  }
}
