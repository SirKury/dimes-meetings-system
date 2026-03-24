import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @Transform(({ value }: { value: string | undefined }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
