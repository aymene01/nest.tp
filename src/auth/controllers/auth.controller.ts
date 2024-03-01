import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authenticationService.login(dto);
    return {
      user,
      token: this.authenticationService.generateAccessToken(user),
    };
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authenticationService.register(dto);
  }
}
