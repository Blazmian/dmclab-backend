import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin as AdminEntity } from 'src/entities/admin.entity';
import { IAdmin } from 'src/models/Admin';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt'

@Injectable()
export class AdminService {
    
    constructor (
        @InjectRepository(AdminEntity) 
        private adminEntity : Repository<AdminEntity>)
        {}

    async create(admin : IAdmin) {
        const { password } = admin
        const plainToHash = await hash(password, 10)
        admin = { ...admin, password: plainToHash }
        return await this.adminEntity.insert(admin)
    }

    async getAll() : Promise<AdminEntity[]> {
        return await this.adminEntity.find()
    }

    async get(username : string) : Promise<AdminEntity> {
        return await this.adminEntity.findOne({ where: { username: username } })
    }

    async update(username : string, body : IAdmin) {
        return await this.adminEntity.update(username, body)
    }

    async delete(username : string) {
        return await this.adminEntity.delete(username)
    }
}