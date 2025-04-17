import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
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

  canActivate(context: ExecutionContext) {
    // Check for public routes first (optional)
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
      // Verify token manually to get more detailed error information
      this.jwtService.verify(token);
      return super.canActivate(context);
    } catch (error) {
      this.logger.error(`JWT verification failed: ${error.message}`);
      throw new UnauthorizedException(this.getErrorMessage(error));
    }
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      this.logger.error(
        `JWT validation error: ${err?.message || info?.message}`,
      );
      throw new UnauthorizedException(
        err?.message || info?.message || 'Invalid authentication token',
      );
    }

    // Attach the user to the request for later use in controllers
    const request = context.switchToHttp().getRequest<Request>();
    request.user = user;

    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getErrorMessage(error: Error): string {
    if (error.name === 'TokenExpiredError') {
      return 'Authentication token has expired';
    } else if (error.name === 'JsonWebTokenError') {
      return 'Invalid authentication token';
    }
    return 'Authentication failed';
  }
}
