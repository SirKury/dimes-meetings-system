import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { MeetingStatus } from '@prisma/client';

export class CreateMeetingDto {
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsDateString()
  scheduledAt!: string;

  @IsOptional()
  @IsEnum(MeetingStatus)
  status?: MeetingStatus;

  @IsOptional()
  @IsUUID()
  establishmentId?: string;
}
