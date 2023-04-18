import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/entities/user.entity';
import { hash } from 'bcrypt'
import { Not, Repository } from 'typeorm';
import { StaffService } from '../Staff/staff.service';
import { IUser } from 'src/models/User';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userEntity: Repository<UserEntity>,
        private staffService: StaffService
    ) { }

    async create(idStaff: number, typeUser: string, user: IUser) {
        const validateUsername = await this.get(user.username)
        if (!validateUsername) {
            const { password } = user
            const plainToHash = await hash(password, 10)

            const staff = await this.staffService.get(idStaff)
            if (typeUser === 'admin') {
                staff.admin = true
            } else {
                staff.receptionist = true
            }
            await this.staffService.updateInfo(staff)

            user = { ...user, password: plainToHash, staff: staff }
            const res = await this.userEntity.insert(user)

            return res
        } else {
            return "Duplicated Username"
        }
    }

    async getAll(): Promise<UserEntity[]> {
        return await this.userEntity.find()
    }

    async get(username: string): Promise<UserEntity> {
        return await this.userEntity.findOne(
            {
                where: { username: username },
                relations: { staff: true }
            }
        )
    }

    async update(username: string, body: IUser) {
        return await this.userEntity.update(username, body)
    }

    async submitFingerprint(id: string, body: string) {
        return await this.userEntity.update(id, { fingerprint: body })
    }

    async delete(idUser: number, username: string) {
        const staff = await this.staffService.get(idUser)
        if (!staff) {
            return
        }

        staff.admin = false
        staff.receptionist = false

        await this.staffService.updateInfo(staff)

        return await this.userEntity.delete(username)
    }
}