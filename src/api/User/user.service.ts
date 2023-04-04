import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/entities/user.entity';
import { IReceptionist } from 'src/models/Receptionist';
import { hash } from 'bcrypt'
import { Repository } from 'typeorm';
import { StaffService } from '../Staff/staff.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userEntity: Repository<UserEntity>,
        private staffService: StaffService
        ) { }

    async create(idUser: number, user: IReceptionist) {
        const validateUsername = await this.get(user.username)
        console.log(validateUsername)
        if (!validateUsername) {
            const { password } = user
            const plainToHash = await hash(password, 10)
            user = { ...user, password: plainToHash }
            const res = await this.userEntity.insert(user)
            const newUser = await this.userEntity.findOneBy({ id: res.identifiers[0].id })
            const staff = await this.staffService.getById(idUser)
            staff.user[0] = newUser
            await this.staffService.updateInfo(staff)
            return true
        } else {
            return "Duplicated Username"
        }
    }

    async getAll(): Promise<UserEntity[]> {
        return await this.userEntity.find()
    }

    async get(username: string): Promise<UserEntity> {
        return await this.userEntity.findOne({ where: { username: username } })
    }

    async update(username: string, body: IReceptionist) {
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

        staff.user = null;
        await this.staffService.updateInfo(staff)

        return await this.userEntity.delete(username)
    }
}