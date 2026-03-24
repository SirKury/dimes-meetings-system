import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Minute } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RequestUser } from '../common/types/request-user.type';
import { MinutesService } from './minutes.service';
import { QueryMinutesDto } from './dto/query-minutes.dto';
import { UpsertMinuteDto } from './dto/upsert-minute.dto';

@Controller('minutes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MinutesController {
  constructor(private readonly minutesService: MinutesService) {}

  @Get()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  findAll(@CurrentUser() user: RequestUser, @Query() query: QueryMinutesDto): Promise<Minute[]> {
    return this.minutesService.findAll(user, query);
  }

  @Post()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  upsert(@CurrentUser() user: RequestUser, @Body() dto: UpsertMinuteDto): Promise<Minute> {
    return this.minutesService.upsert(user, dto);
  }
}
