// src/auth/get-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Extend the Request interface to include the 'user' property
declare module 'express' {
  export interface Request {
    user?: any; // Adjust the type of 'user' as needed
  }
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user;
  },
);
