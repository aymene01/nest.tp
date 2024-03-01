import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly rateLimiter: RateLimiter;

  constructor() {
    this.rateLimiter = new RateLimiter(5, 60000);
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { ip } = req;
    if (this.rateLimiter.isRateLimited(ip)) {
      return res.status(HttpStatus.TOO_MANY_REQUESTS).json({
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        error: 'Too Many Requests',
        message: 'Rate limit exceeded',
      });
    }

    next();
  }
}

class RateLimiter {
  private requestCountByIp: Map<string, number> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isRateLimited(clientIp: string): boolean {
    const currentTimestamp = Date.now();
    const lastRequestTimestamp =
      this.requestCountByIp.get(clientIp + 'timestamp') || 0;

    if (currentTimestamp - lastRequestTimestamp > this.windowMs) {
      this.requestCountByIp.set(clientIp, 1);
    } else {
      const requestCount = (this.requestCountByIp.get(clientIp) || 0) + 1;
      this.requestCountByIp.set(clientIp, requestCount);

      if (requestCount > this.maxRequests) {
        return true;
      }
    }

    this.requestCountByIp.set(clientIp + 'timestamp', currentTimestamp);
    return false;
  }
}
