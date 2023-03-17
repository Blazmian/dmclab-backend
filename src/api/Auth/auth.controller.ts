import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAdminLogin } from 'src/models/Admin';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    loginAdmin(@Body() adminObj: IAdminLogin) {
        return this.authService.login(adminObj)
    }
}