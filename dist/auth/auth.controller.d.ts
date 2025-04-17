import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(username: string, refNumber: string, password: string, role: string): Promise<import("mongoose").Document<unknown, {}, import("../users/user.schema").UserDocument> & import("../users/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    loginUser(username: string, password: string): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, import("../users/user.schema").UserDocument> & import("../users/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    checkLogin(token: string): Promise<{
        loggedIn: boolean;
        user: import("mongoose").Document<unknown, {}, import("../users/user.schema").UserDocument> & import("../users/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getProtectedRoute(req: any): {
        message: string;
        user: any;
    };
}
