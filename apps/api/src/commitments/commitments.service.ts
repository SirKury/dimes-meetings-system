import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Commitment, Prisma } from '@prisma/client';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { RequestUser } from '../common/types/request-user.type';
import { PrismaService } from '../prisma.service';
import { CreateCommitmentDto } from './dto/create-commitment.dto';
import { QueryCommitmentsDto } from './dto/query-commitments.dto';
import { UpdateCommitmentStatusDto } from './dto/update-commitment-status.dto';

@Injectable()
export class CommitmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogsService: AuditLogsService
  ) {}

  findAll(user: RequestUser, query: QueryCommitmentsDto): Promise<Commitment[]> {
    const where: Prisma.CommitmentWhereInput = {
      status: query.status,
      establishmentId:
        user.role === 'SUPERADMIN' ? (query.establishmentId ?? undefined) : user.establishmentId
    };

    return this.prisma.commitment.findMany({
      where,
      include: {
        responsible: { select: { id: true, firstName: true, lastName: true } },
        minute: { include: { meeting: true } }
      },
      orderBy: { dueDate: 'asc' }
    });
  }

  async create(user: RequestUser, dto: CreateCommitmentDto): Promise<Commitment> {
    const minute = await this.prisma.minute.findUnique({
      where: { id: dto.minuteId },
      include: { meeting: true }
    });

    if (!minute) {
      throw new NotFoundException('Minute not found');
    }

    if (user.role !== 'SUPERADMIN' && minute.meeting.establishmentId !== user.establishmentId) {
      throw new ForbiddenException('Minute is outside your establishment scope');
    }

    const commitment = await this.prisma.commitment.create({
      data: {
        minuteId: dto.minuteId,
        establishmentId: minute.meeting.establishmentId,
        description: dto.description,
        dueDate: new Date(dto.dueDate),
        status: dto.status ?? 'PENDING',
        responsibleId: dto.responsibleId,
        createdById: user.sub,
        completedAt: dto.status === 'COMPLETED' ? new Date() : null
      }
    });

    await this.auditLogsService.register(user, {
      action: 'COMMITMENT_CREATED',
      entity: 'Commitment',
      entityId: commitment.id,
      establishmentId: commitment.establishmentId,
      metadata: { status: commitment.status }
    });

    return commitment;
  }

  async updateStatus(
    user: RequestUser,
    commitmentId: string,
    dto: UpdateCommitmentStatusDto
  ): Promise<Commitment> {
    const commitment = await this.prisma.commitment.findUnique({ where: { id: commitmentId } });

    if (!commitment) {
      throw new NotFoundException('Commitment not found');
    }

    if (user.role !== 'SUPERADMIN' && commitment.establishmentId !== user.establishmentId) {
      throw new ForbiddenException('Commitment is outside your establishment scope');
    }

    const updated = await this.prisma.commitment.update({
      where: { id: commitmentId },
      data: {
        status: dto.status,
        completedAt: dto.status === 'COMPLETED' ? new Date() : null
      }
    });

    await this.auditLogsService.register(user, {
      action: 'COMMITMENT_STATUS_UPDATED',
      entity: 'Commitment',
      entityId: updated.id,
      establishmentId: updated.establishmentId,
      metadata: { status: updated.status }
    });

    return updated;
  }
}
