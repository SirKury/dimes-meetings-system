import { IsUUID } from 'class-validator';

export class MeetingIdQueryDto {
  @IsUUID()
  meetingId!: string;
}
