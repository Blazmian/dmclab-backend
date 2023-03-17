import { HttpException, Injectable } from '@nestjs/common';
import { IAdminLogin } from 'src/models/Admin';
import { AdminService } from '../Admin/admin.service';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService
    ) {}

    async validateAdmin(username: string, pass: string): Promise<any> {
        const admin = await this.adminService.get(username)
        if (admin && admin[0].password === pass) {
            const { password, ...result } = admin
            return result
        }
        return null
    }

    async login(adminObj: IAdminLogin) {
        const findAdmin = await this.adminService.get(adminObj.username)
        if(!findAdmin) throw new HttpException('USER_NOT_FOUND', 404)

        const checkPassword = await compare(adminObj.password, findAdmin.password)
        if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)

        const data = findAdmin
        return data
    }
}