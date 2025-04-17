import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async registerUser(
        @Body('username') username: string,
        @Body('refNumber') refNumber: string,
        @Body('password') password: string,
        @Body('role') role: string,
    ) {
        return this.authService.registerUser(username, refNumber, password, role);
    }

    @Post('login')
    async loginUser(@Body('username') username: string, @Body('password') password: string) {
        return this.authService.loginUser(username, password);
    }

    @Post('check-login')
    async checkLogin(@Body('token') token: string) {
        return this.authService.validateUserByToken(token);
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getProtectedRoute(@Req() req) {
        return { message: 'You have access', user: req.user };
    }

}
