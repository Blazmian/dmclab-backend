import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin as AdminEntity } from 'src/entities/admin.entity';
import { IAdmin } from 'src/models/Admin';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    
    constructor (
        @InjectRepository(AdminEntity) 
        private adminEntity : Repository<AdminEntity>)
        {}

    async create(admin : IAdmin) {
        return await this.adminEntity.insert(admin)
    }

    async getAll() : Promise<AdminEntity[]> {
        return await this.adminEntity.find()
    }

    async get(username : string) : Promise<AdminEntity[]> {
        return await this.adminEntity.find(
            { where : {username : username}
        })
    }

    async update(username : string, body : IAdmin) {
        return await this.adminEntity.update(username, body)
    }

    async delete(username : string) {
        return await this.adminEntity.delete(username)
    }
}