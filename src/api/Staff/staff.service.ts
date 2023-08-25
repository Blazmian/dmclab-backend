import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff, Staff as StaffEntity } from 'src/entities/staff.entity';
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
        if (!fs.existsSync(`${process.cwd()}/temp`)) {
            fs.mkdirSync(`${process.cwd()}/temp`);
        }

        const newStaff = new StaffEntity()
        newStaff.name = staff.name
        newStaff.first_last_name = staff.first_last_name
        newStaff.second_last_name = staff.second_last_name

        if (staff.photo) {
            const tempFileName = uuidv4()
            const tempFilePath = `${process.cwd()}/temp/${tempFileName}`
            fs.writeFileSync(tempFilePath, staff.photo)
            newStaff.photo = fs.readFileSync(tempFilePath)
            fs.unlinkSync(tempFilePath)
        }

        const res = await this.staffEntity.save(newStaff)

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

    async getUserPhoto(id: number): Promise<Buffer> {
        const res = await this.staffEntity.findOne({
            where: { id: id },
            select: ['photo'],
        })
        return res.photo
    }

    async getById(id: number): Promise<StaffEntity> {
        return await this.staffEntity.findOne({ where: { id: id } })
    }

    async update(id: number, body: IStaff) {
        return await this.staffEntity.update(id, body)
    }
    async updateUser(id: number, staff: Staff): Promise<Staff> {
        const existingUser = await this.staffEntity.findOne({ where: { id: id } });
        if (!existingUser) {
          throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    
        // Actualizar los datos del usuario con los nuevos valores
        existingUser.name = staff.name;
        existingUser.first_last_name = staff.first_last_name;
        existingUser.second_last_name = staff.second_last_name;
        //obtener la foto ¿?
        existingUser.photo = staff.photo;
    
        // Guardar los cambios en la base de datos
        await this.staffEntity.save(existingUser);
    
        return existingUser;
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