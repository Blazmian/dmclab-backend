import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff as StaffEntity } from 'src/entities/staff.entity';
import { IStaff } from 'src/models/Staff';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {

    constructor (@InjectRepository(StaffEntity) private staffEntity : Repository<StaffEntity>) {}

    async create(staff : IStaff) {
        return await this.staffEntity.insert(staff)
    }

    async getAll() : Promise<StaffEntity[]> {
        return await this.staffEntity.find()
    }

    async get(id : number) : Promise<StaffEntity[]> {
        return await this.staffEntity.find(
            { where : {id : id}
        })
    }

    async update(id : number, body : IStaff) {
        return await this.staffEntity.update(id, body)
    }

    async delete(id : number) {
        return await this.staffEntity.delete(id)
    }
}