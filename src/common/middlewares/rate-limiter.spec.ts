import { Test, TestingModule } from '@nestjs/testing';
import { RateLimitMiddleware } from './rate-limiter';
import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

describe('RateLimitMiddleware', () => {
  let middleware: RateLimitMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateLimitMiddleware],
    }).compile();

    middleware = module.get<RateLimitMiddleware>(RateLimitMiddleware);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNextFunction = jest.fn();
  });

  it('should allow the request if not rate-limited', () => {
    jest
      .spyOn(middleware['rateLimiter'], 'isRateLimited')
      .mockReturnValue(false);

    middleware.use(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction,
    );

    expect(mockNextFunction).toHaveBeenCalled();
  });

  it('should return a 429 response if rate-limited', () => {
    jest
      .spyOn(middleware['rateLimiter'], 'isRateLimited')
      .mockReturnValue(true);

    middleware.use(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.TOO_MANY_REQUESTS,
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded',
    });
    expect(mockNextFunction).not.toHaveBeenCalled();
  });
});
