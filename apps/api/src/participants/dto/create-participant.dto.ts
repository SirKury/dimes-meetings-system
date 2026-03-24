import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateParticipantDto {
  @IsUUID()
  meetingId!: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  establishmentId?: string;

  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fullName!: string;

  @Transform(({ value }: { value?: string }) => value?.trim().toLowerCase())
  @IsOptional()
  @IsEmail()
  email?: string;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(255)
  position?: string;

  @IsOptional()
  @IsBoolean()
  isExternal?: boolean;
}
