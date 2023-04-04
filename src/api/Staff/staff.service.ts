import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff as StaffEntity } from 'src/entities/staff.entity';
import { IStaff, IStaffAll } from 'src/models/Staff';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {

    constructor(
        @InjectRepository(StaffEntity)
        private staffEntity: Repository<StaffEntity>,
    ) { }

    async create(staff: IStaff) {
        return await this.staffEntity.insert(staff)
    }

    async getAll(): Promise<StaffEntity[]> {
        return await this.staffEntity.find({
            relations: { user: true }
        })
    }

    async get(id: number): Promise<StaffEntity> {
        return await this.staffEntity.findOne(
            {
                where: { id: id },
                relations: { user: true }
            })
    }

    async getById(id: number): Promise<StaffEntity> {
        return await this.staffEntity.findOne({ where: { id: id } })
    }

    async update(id: number, body: IStaff) {
        return await this.staffEntity.update(id, body)
    }

    async updateInfo(staff: IStaffAll): Promise<StaffEntity> {
        return await this.staffEntity.save(staff)
    }

    async delete(id: number) {
        const staff = await this.get(id)
        if (!staff) {
            return
        }

        staff.user = null

        await this.updateInfo(staff)

        return await this.staffEntity.delete(id)
    }
}