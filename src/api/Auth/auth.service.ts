import { HttpException, Injectable } from '@nestjs/common';
import { IAdminLogin } from 'src/models/Admin';
import { AdminService } from '../Admin/admin.service';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constanst';

@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private jwtService: JwtService
    ) {}

    async validateAdmin(username: string, pass: string): Promise<any> {
        const admin = await this.adminService.get(username)
        
        const checkPassword = await compare(pass, admin.password)

        if (admin && checkPassword) {
            const { password, ...result } = admin
            return result
        }
        return null
    }

    async login(adminObj: IAdminLogin) {
        const findAdmin = await this.adminService.get(adminObj.username)
        if(!findAdmin) throw new HttpException('USER_NOT_FOUND', 404)

        const payload = { id: findAdmin.staff, user: findAdmin.username }
        const token = this.jwtService.sign(payload, { secret: jwtConstants.secret, expiresIn: '60s' })

        const data = {
            admin: findAdmin,
            token,
        }
        return data
    }
}