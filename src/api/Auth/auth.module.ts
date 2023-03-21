import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { AdminModule } from '../Admin/admin.module';
import { AdminService } from '../Admin/admin.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [AdminModule, PassportModule],
    controllers: [AuthController],
    providers: [AuthService, AdminService, LocalStrategy, JwtService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }
