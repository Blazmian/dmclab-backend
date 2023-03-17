import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { AdminModule } from '../Admin/admin.module';
import { AdminService } from '../Admin/admin.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constanst';

@Module({
    imports: [AdminModule, PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
    })],
    controllers: [],
    providers: [AuthService, AdminService],
})
export class AuthModule { }
