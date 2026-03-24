import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { MeetingsModule } from './meetings/meetings.module';
import { MinutesModule } from './minutes/minutes.module';
import { ParticipantsModule } from './participants/participants.module';
import { PrismaModule } from './prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    EstablishmentsModule,
    MeetingsModule,
    ParticipantsModule,
    AttendanceModule,
    MinutesModule
  ],
  providers: [JwtAuthGuard, RolesGuard]
})
export class AppModule {}
