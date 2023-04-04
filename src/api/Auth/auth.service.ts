import { HttpException, Injectable } from '@nestjs/common';
import { IUserLogin } from 'src/models/User';
import { UserService } from '../User/user.service';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constanst';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateAdmin(username: string, pass: string): Promise<any> {
        const admin = await this.userService.get(username)
        if(!admin) throw new HttpException('USER_NOT_FOUND', 404)

        const checkPassword = await compare(pass, admin.password)

        if (admin && checkPassword) {
            const { password, ...result } = admin
            return result
        }
        return null
    }

    async login(adminObj: IUserLogin) {
        const findAdmin = await this.userService.get(adminObj.username)

        const payload = { user: findAdmin.username }
        return {
            admin: findAdmin,
            token: this.jwtService.sign(payload, { secret: jwtConstants.secret, expiresIn: '60s' })
        }
    }
}