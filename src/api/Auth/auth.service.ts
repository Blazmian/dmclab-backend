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

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.get(username)
        if(!user) throw new HttpException('USER_NOT_FOUND', 404)

        const checkPassword = await compare(pass, user.password)

        if (user && checkPassword) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(userObj: IUserLogin) {
        const findUser = await this.userService.get(userObj.username)

        const payload = { user: findUser.username, staff: findUser.staff }
        return {
            admin: findUser,
            token: this.jwtService.sign(payload, { secret: jwtConstants.secret, expiresIn: '60s' })
        }
    }
}