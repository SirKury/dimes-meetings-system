import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { ATTENDANCE_STATUS, AttendanceStatusValue } from './create-attendance.dto';

export class UpdateAttendanceDto {
  @IsOptional()
  @IsIn(ATTENDANCE_STATUS)
  status?: AttendanceStatusValue;

  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
