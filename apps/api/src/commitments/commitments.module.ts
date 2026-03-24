import { Module } from '@nestjs/common';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { CommitmentsController } from './commitments.controller';
import { CommitmentsService } from './commitments.service';

@Module({
  imports: [AuditLogsModule],
  controllers: [CommitmentsController],
  providers: [CommitmentsService]
})
export class CommitmentsModule {}
