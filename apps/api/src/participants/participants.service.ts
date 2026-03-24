import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Participant, Prisma } from '@prisma/client';
import { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { isGlobalRole } from '../common/auth-scope.util';
import { handlePrismaCreateError } from '../common/prisma-error.util';
import { PrismaService } from '../prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(meetingId: string, user: AuthenticatedUser): Promise<Participant[]> {
    await this.ensureMeetingAccess(meetingId, user);
    return this.prisma.participant.findMany({ where: { meetingId }, orderBy: { createdAt: 'asc' } });
  }

  async create(dto: CreateParticipantDto, user: AuthenticatedUser): Promise<Participant> {
    await this.ensureMeetingAccess(dto.meetingId, user);

    const data: Prisma.ParticipantCreateInput = {
      fullName: dto.fullName,
      email: dto.email,
      position: dto.position,
      isExternal: dto.isExternal ?? false,
      meeting: { connect: { id: dto.meetingId } },
      user: dto.userId ? { connect: { id: dto.userId } } : undefined,
      establishment: dto.establishmentId ? { connect: { id: dto.establishmentId } } : undefined
    };

    try {
      return await this.prisma.participant.create({ data });
    } catch (error) {
      handlePrismaCreateError(error, 'participant');
    }
  }

  async update(id: string, dto: UpdateParticipantDto, user: AuthenticatedUser): Promise<Participant> {
    const participant = await this.findOne(id, user);

    if (dto.establishmentId && !isGlobalRole(user)) {
      throw new ForbiddenException('Only SUPERADMIN can reassign participant establishment');
    }

    const data: Prisma.ParticipantUpdateInput = {
      fullName: dto.fullName,
      email: dto.email,
      position: dto.position,
      isExternal: dto.isExternal,
      user: dto.userId ? { connect: { id: dto.userId } } : undefined,
      establishment: dto.establishmentId ? { connect: { id: dto.establishmentId } } : undefined
    };

    return this.prisma.participant.update({ where: { id: participant.id }, data });
  }

  async remove(id: string, user: AuthenticatedUser): Promise<Participant> {
    const participant = await this.findOne(id, user);
    return this.prisma.participant.delete({ where: { id: participant.id } });
  }

  private async findOne(id: string, user: AuthenticatedUser): Promise<Participant> {
    const participant = await this.prisma.participant.findUnique({ where: { id } });
    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    await this.ensureMeetingAccess(participant.meetingId, user);
    return participant;
  }

  private async ensureMeetingAccess(meetingId: string, user: AuthenticatedUser): Promise<void> {
    const meeting = await this.prisma.meeting.findUnique({ where: { id: meetingId } });
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    if (!isGlobalRole(user) && meeting.establishmentId !== user.establishmentId) {
      throw new ForbiddenException('You are not authorized to access this meeting');
    }
  }
}
