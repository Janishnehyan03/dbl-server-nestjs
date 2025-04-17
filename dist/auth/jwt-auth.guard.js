"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("../decorators/public.decorator");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    reflector;
    jwtService;
    logger = new common_1.Logger(JwtAuthGuard_1.name);
    constructor(reflector, jwtService) {
        super();
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            this.logger.warn('No JWT token found in request headers');
            throw new common_1.UnauthorizedException('Authentication token is required');
        }
        try {
            this.jwtService.verify(token);
            return super.canActivate(context);
        }
        catch (error) {
            this.logger.error(`JWT verification failed: ${error.message}`);
            throw new common_1.UnauthorizedException(this.getErrorMessage(error));
        }
    }
    handleRequest(err, user, info, context) {
        if (err || !user) {
            this.logger.error(`JWT validation error: ${err?.message || info?.message}`);
            throw new common_1.UnauthorizedException(err?.message || info?.message || 'Invalid authentication token');
        }
        const request = context.switchToHttp().getRequest();
        request.user = user;
        return user;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    getErrorMessage(error) {
        if (error.name === 'TokenExpiredError') {
            return 'Authentication token has expired';
        }
        else if (error.name === 'JsonWebTokenError') {
            return 'Invalid authentication token';
        }
        return 'Authentication failed';
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map