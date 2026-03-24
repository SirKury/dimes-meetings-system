import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AttendancesModule } from './attendances/attendances.module';
import { AuthModule } from './auth/auth.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { MeetingMinutesModule } from './meeting-minutes/meeting-minutes.module';
import { MeetingsModule } from './meetings/meetings.module';
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
    AttendancesModule,
    MeetingMinutesModule
  ]
})
export class AppModule {}
