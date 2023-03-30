import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receptionist as ReceptionistEntity } from 'src/entities/receptionist.entity';
import { IReceptionist } from 'src/models/Receptionist';
import { hash } from 'bcrypt'
import { Repository } from 'typeorm';
import { StaffService } from '../Staff/staff.service';

@Injectable()
export class ReceptionistService {
    constructor(
        @InjectRepository(ReceptionistEntity)
        private receptionistEntity: Repository<ReceptionistEntity>,
        private staffService: StaffService
        ) { }

    async create(idUser: number, receptionist: IReceptionist) {
        const validateUsername = await this.get(receptionist.username)
        console.log(validateUsername)
        if (!validateUsername) {
            const { password } = receptionist
            const plainToHash = await hash(password, 10)
            receptionist = { ...receptionist, password: plainToHash }
            const res = await this.receptionistEntity.insert(receptionist)
            const newReceptionist = await this.receptionistEntity.findOneBy({ id: res.identifiers[0].id })
            const staff = await this.staffService.getById(idUser)
            staff.receptionist = newReceptionist
            await this.staffService.updateInfo(staff)
            return true
        } else {
            return "Duplicated Username"
        }
    }

    async getAll(): Promise<ReceptionistEntity[]> {
        return await this.receptionistEntity.find()
    }

    async get(username: string): Promise<ReceptionistEntity> {
        return await this.receptionistEntity.findOne({ where: { username: username } })
    }

    async update(username: string, body: IReceptionist) {
        return await this.receptionistEntity.update(username, body)
    }

    async submitFingerprint(id: string, body: string) {
        return await this.receptionistEntity.update(id, { fingerprint: body })
    }

    async delete(idUser: number, username: string) {
        const staff = await this.staffService.get(idUser)
        if (!staff) {
            return
        }

        staff.receptionist = null;
        await this.staffService.updateInfo(staff)

        return await this.receptionistEntity.delete(username)
    }
}