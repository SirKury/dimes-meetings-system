import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Attachment } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RequestUser } from '../common/types/request-user.type';
import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { QueryAttachmentsDto } from './dto/query-attachments.dto';

@Controller('attachments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  findAll(@CurrentUser() user: RequestUser, @Query() query: QueryAttachmentsDto): Promise<Attachment[]> {
    return this.attachmentsService.findAll(user, query);
  }

  @Post()
  @Roles('SUPERADMIN', 'DIMES_ADMIN', 'DIMES_USER')
  create(@CurrentUser() user: RequestUser, @Body() dto: CreateAttachmentDto): Promise<Attachment> {
    return this.attachmentsService.create(user, dto);
  }
}
