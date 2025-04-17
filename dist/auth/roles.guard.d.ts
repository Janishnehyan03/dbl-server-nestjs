import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RolesGuard implements CanActivate {
    private readonly requiredRoles;
    constructor(requiredRoles: string[]);
    canActivate(context: ExecutionContext): boolean;
}
