import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff as StaffEntity } from 'src/entities/staff.entity';
import { IStaff, IStaffAll } from 'src/models/Staff';
import { Not, Repository } from 'typeorm';
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class StaffService {

    constructor(
        @InjectRepository(StaffEntity)
        private staffEntity: Repository<StaffEntity>,
    ) { }

    async create(staff: IStaff) {
        const tempFileName = uuidv4()
        if (!fs.existsSync(`${process.cwd()}/temp`)) {
            fs.mkdirSync(`${process.cwd()}/temp`);
        }
        const tempFilePath = `${process.cwd()}/temp/${tempFileName}`
        fs.writeFileSync(tempFilePath, staff.photo)

        const newStaff = new StaffEntity()
        newStaff.name = staff.name
        newStaff.first_last_name = staff.first_last_name
        newStaff.second_last_name = staff.second_last_name
        newStaff.photo = fs.readFileSync(tempFilePath)
        const res = await this.staffEntity.save(newStaff)

        fs.unlinkSync(tempFilePath)

        return res
    }

    async getAll(): Promise<StaffEntity[]> {
        return await this.staffEntity.find({
            relations: { user: true },
            order: { id: 'ASC' }
        })
    }

    async getAllWithoutCurrent(id: number): Promise<StaffEntity[]> {
        return await this.staffEntity.find({
            where: { id: Not(id) },
            relations: { user: true },
            select: ['id', 'name', 'first_last_name', 'second_last_name', 'admin', 'receptionist', 'user'],
            order: { id: 'ASC' }
        })
    }

    async get(id: number): Promise<StaffEntity> {
        return await this.staffEntity.findOne(
            {
                where: { id: id },
                relations: { user: true }
            })
    }

    async getUserPhoto(id: number): Promise<{ photo: string }> {
        const res = await this.staffEntity.findOne({
            where: { id: id },
            select: ['photo'],
        })
        const base64 = res.photo.toString('base64')
        return { photo: base64 }
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