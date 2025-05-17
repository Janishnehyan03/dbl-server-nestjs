import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
  mixin,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check for public routes first
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn('No JWT token found in request headers');
      throw new UnauthorizedException('Authentication token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = payload; // Attach the user payload to the request object
      return true;
    } catch (error) {
      this.logger.error(
        `JWT verification failed: ${error.message}`,
        error.stack,
      );
      throw new UnauthorizedException(this.getErrorMessage(error));
    }
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.error(
        `JWT validation error: ${err?.message || info?.message}`,
      );
      throw new UnauthorizedException(
        err?.message || info?.message || 'Invalid authentication token',
      );
    }
    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader =
      request.headers.authorization || request.headers.Authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.toString().split(' ');
    return type === 'Bearer' ? token : undefined;
  }

  private getErrorMessage(error: any): string {
    if (error.name === 'TokenExpiredError') {
      return 'Authentication token has expired';
    } else if (error.name === 'JsonWebTokenError') {
      return 'Invalid authentication token';
    } else if (error.name === 'NotBeforeError') {
      return 'Token not yet valid';
    }
    return 'Authentication failed';
  }
}
