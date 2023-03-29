import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin as AdminEntity } from 'src/entities/admin.entity';
import { IAdmin } from 'src/models/Admin';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt'
import { StaffService } from '../Staff/staff.service';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(AdminEntity)
        private adminEntity: Repository<AdminEntity>,
        private staffService: StaffService
    ) { }

    async create(idUser: number, admin: IAdmin) {
        const validateUsername = await this.get(admin.username)
        if (!validateUsername) {
            const { password } = admin
            const plainToHash = await hash(password, 10)
            admin = { ...admin, password: plainToHash }
            const res = await this.adminEntity.insert(admin)
            const newAdmin = await this.adminEntity.findOneBy({ id: res.identifiers[0].id })
            const staff = await this.staffService.getById(idUser)
            staff.admin = newAdmin
            await this.staffService.updateInfo(staff)
            return true
        } else {
            return "Duplicated Username"
        }
    }

    async getAll(): Promise<AdminEntity[]> {
        return await this.adminEntity.find()
    }

    async get(username: string): Promise<AdminEntity> {
        return await this.adminEntity.findOne({ where: { username: username } })
    }

    async update(username: string, body: IAdmin) {
        return await this.adminEntity.update(username, body)
    }

    async delete(username: string) {
        return await this.adminEntity.delete(username)
    }
}