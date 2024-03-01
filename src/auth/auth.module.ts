import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './controllers/auth.controller';
import { AuthenticationService } from './services/auth.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
