import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Commitment } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RequestUser } from '../common/types/request-user.type';
import { CommitmentsService } from './commitments.service';
import { CreateCommitmentDto } from './dto/create-commitment.dto';
import { QueryCommitmentsDto } from './dto/query-commitments.dto';
import { UpdateCommitmentStatusDto } from './dto/update-commitment-status.dto';

@Controller('commitments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommitmentsController {
  constructor(private readonly commitmentsService: CommitmentsService) {}

  @Get()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  findAll(@CurrentUser() user: RequestUser, @Query() query: QueryCommitmentsDto): Promise<Commitment[]> {
    return this.commitmentsService.findAll(user, query);
  }

  @Post()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  create(@CurrentUser() user: RequestUser, @Body() dto: CreateCommitmentDto): Promise<Commitment> {
    return this.commitmentsService.create(user, dto);
  }

  @Patch(':id/status')
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  updateStatus(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: UpdateCommitmentStatusDto
  ): Promise<Commitment> {
    return this.commitmentsService.updateStatus(user, id, dto);
  }
}
