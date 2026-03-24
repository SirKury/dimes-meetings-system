import { MinuteStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpsertMinuteDto {
  @IsUUID()
  meetingId!: string;

  @IsString()
  @MaxLength(1000)
  objective!: string;

  @IsString()
  agenda!: string;

  @IsString()
  development!: string;

  @IsString()
  agreements!: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsEnum(MinuteStatus)
  status?: MinuteStatus;
}
