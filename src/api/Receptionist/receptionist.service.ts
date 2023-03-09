import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receptionist as ReceptionistEntity } from 'src/entities/receptionist.entity';
import { IReceptionist } from 'src/models/Receptionist';
import { Repository } from 'typeorm';

@Injectable()
export class ReceptionistService {
    constructor (
        @InjectRepository(ReceptionistEntity) 
        private receptionistEntity : Repository<ReceptionistEntity>)
        {}

    async create(receptionist : IReceptionist) {
        return await this.receptionistEntity.insert(receptionist)
    }

    async getAll() : Promise<ReceptionistEntity[]> {
        return await this.receptionistEntity.find()
    }

    async get(username : string) : Promise<ReceptionistEntity[]> {
        return await this.receptionistEntity.find(
            { where : {username : username}
        })
    }

    async update(username : string, body : IReceptionist) {
        return await this.receptionistEntity.update(username, body)
    }

    async submitFingerprint(id : string, body : string) {
        return await this.receptionistEntity.update(id, { fingerprint : body })
    }

    async delete(username : string) {
        return await this.receptionistEntity.delete(username)
    }
}