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
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantsService } from './participants.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Get()
  findAll(@Query() query: MeetingIdQueryDto, @CurrentUser() user: AuthenticatedUser): Promise<unknown[]> {
    return this.participantsService.findAll(query.meetingId, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Post()
  create(@Body() dto: CreateParticipantDto, @CurrentUser() user: AuthenticatedUser): Promise<unknown> {
    return this.participantsService.create(dto, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN, SYSTEM_ROLES.DIMES_USER)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateParticipantDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<unknown> {
    return this.participantsService.update(id, dto, user);
  }

  @Roles(SYSTEM_ROLES.SUPERADMIN, SYSTEM_ROLES.DIMES_ADMIN)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @CurrentUser() user: AuthenticatedUser): Promise<unknown> {
    return this.participantsService.remove(id, user);
  }
}
