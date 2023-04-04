import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { UserModule } from '../User/user.module';
import { UserService } from '../User/user.service';
import { StaffModule } from '../Staff/staff.module';
import { StaffService } from '../Staff/staff.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [StaffModule, UserModule, PassportModule],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, JwtService, JwtStrategy, StaffService],
    exports: [AuthService]
})
export class AuthModule { }
