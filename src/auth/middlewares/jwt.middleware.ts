import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(request, _response, next) {
    const { authorization: token } = request.headers;

    try {
      const payload = jwt.verify(token, 'SECRET');
      const user = await this.usersService.findUnique({ uuid: payload['id'] });
      if (!user) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      request.user = user;
      next();
    } catch (_error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
