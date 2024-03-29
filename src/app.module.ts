import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './auth/auth.module';
import { LoggerMiddleware, RateLimitMiddleware } from 'src/common/middlewares';
import { JwtMiddleware } from './auth/middlewares/jwt.middleware';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [
    UsersModule,
    AuthenticationModule,
    ConfigModule.register({ filename: '.env' }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(RateLimitMiddleware).forRoutes('*');
    consumer.apply(JwtMiddleware).forRoutes('/users');
  }
}
