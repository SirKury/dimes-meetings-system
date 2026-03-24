import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RequestUser } from '../common/types/request-user.type';
import { PrismaService } from '../prisma.service';
import { QueryAuditLogsDto } from './dto/query-audit-logs.dto';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async register(
    user: RequestUser,
    input: {
      action: string;
      entity: string;
      entityId: string;
      establishmentId?: string;
      metadata?: Prisma.JsonObject;
    }
  ): Promise<void> {
    const establishmentId = input.establishmentId ?? user.establishmentId;

    await this.prisma.auditLog.create({
      data: {
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        metadata: input.metadata,
        performedById: user.sub,
        establishmentId
      }
    });
  }

  findAll(user: RequestUser, query: QueryAuditLogsDto) {
    if (user.role === 'DIMES_USER') {
      throw new ForbiddenException('Audit logs are restricted to administrative roles');
    }

    return this.prisma.auditLog.findMany({
      where: {
        action: query.action,
        entity: query.entity,
        establishmentId:
          user.role === 'SUPERADMIN' ? (query.establishmentId ?? undefined) : user.establishmentId
      },
      include: {
        performedBy: { select: { id: true, firstName: true, lastName: true, email: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 200
    });
  }
}
