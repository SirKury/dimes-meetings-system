import { IsUUID } from 'class-validator';

export class QueryAttendanceDto {
  @IsUUID()
  meetingId!: string;
}
