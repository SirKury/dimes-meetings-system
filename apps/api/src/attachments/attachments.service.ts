import { ForbiddenException, Injectable } from '@nestjs/common';
import { Attachment, Prisma } from '@prisma/client';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { RequestUser } from '../common/types/request-user.type';
import { PrismaService } from '../prisma.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { QueryAttachmentsDto } from './dto/query-attachments.dto';

@Injectable()
export class AttachmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogsService: AuditLogsService
  ) {}

  findAll(user: RequestUser, query: QueryAttachmentsDto): Promise<Attachment[]> {
    const where: Prisma.AttachmentWhereInput = {
      meetingId: query.meetingId,
      minuteId: query.minuteId,
      commitmentId: query.commitmentId,
      establishmentId:
        user.role === 'SUPERADMIN' ? (query.establishmentId ?? undefined) : user.establishmentId
    };

    return this.prisma.attachment.findMany({
      where,
      include: {
        uploadedBy: { select: { id: true, firstName: true, lastName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(user: RequestUser, dto: CreateAttachmentDto): Promise<Attachment> {
    const scopes = await this.resolveScope(dto);

    if (user.role !== 'SUPERADMIN' && scopes.establishmentId !== user.establishmentId) {
      throw new ForbiddenException('Attachment reference is outside your establishment scope');
    }

    const attachment = await this.prisma.attachment.create({
      data: {
        fileName: dto.fileName,
        filePath: dto.filePath,
        mimeType: dto.mimeType,
        sizeBytes: dto.sizeBytes,
        meetingId: dto.meetingId,
        minuteId: dto.minuteId,
        commitmentId: dto.commitmentId,
        establishmentId: scopes.establishmentId,
        uploadedById: user.sub
      }
    });

    await this.auditLogsService.register(user, {
      action: 'ATTACHMENT_CREATED',
      entity: 'Attachment',
      entityId: attachment.id,
      establishmentId: attachment.establishmentId,
      metadata: { fileName: attachment.fileName }
    });

    return attachment;
  }

  private async resolveScope(dto: CreateAttachmentDto): Promise<{ establishmentId: string }> {
    if (dto.commitmentId) {
      const commitment = await this.prisma.commitment.findUnique({ where: { id: dto.commitmentId } });
      if (commitment) {
        return { establishmentId: commitment.establishmentId };
      }
    }

    if (dto.minuteId) {
      const minute = await this.prisma.minute.findUnique({
        where: { id: dto.minuteId },
        include: { meeting: true }
      });

      if (minute) {
        return { establishmentId: minute.meeting.establishmentId };
      }
    }

    if (dto.meetingId) {
      const meeting = await this.prisma.meeting.findUnique({ where: { id: dto.meetingId } });
      if (meeting) {
        return { establishmentId: meeting.establishmentId };
      }
    }

    throw new ForbiddenException('Attachment must reference a valid meeting, minute, or commitment');
  }
}
