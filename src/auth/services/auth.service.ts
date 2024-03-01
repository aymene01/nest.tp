import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findUnique({ email });
    if (!user || user.password !== password) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  register(dto: RegisterDto) {
    return this.usersService.create(dto);
  }

  generateAccessToken(user: User) {
    const payload = { id: user.uuid };

    return jwt.sign(payload, 'SECRET');
  }
}
