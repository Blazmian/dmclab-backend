import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment as EquipmentEntity } from 'src/entities/equipment.entity';
import { IEquipment } from 'src/models/Equipment';
import { Repository } from 'typeorm';

@Injectable()
export class EquipmentService {

    constructor (
        @InjectRepository(EquipmentEntity) 
        private equipmentEntity : Repository<EquipmentEntity>)
        {}

    async create(equipment: IEquipment) {
        return await this.equipmentEntity.insert(equipment)
    }

    async getAll(): Promise<EquipmentEntity[]> {
        return await this.equipmentEntity.find()
    }

    async get(id: number): Promise<EquipmentEntity[]> {
        return await this.equipmentEntity.find(
            { where: {id: id}
        })
    }

    async getUndamagedEquipment() : Promise<EquipmentEntity[]> {
        return await this.equipmentEntity.find({
            where: { damaged : false }
        })
    }

    async getDamagedEquipment() : Promise<EquipmentEntity[]> {
        return await this.equipmentEntity.find({
            where: { damaged : true }
        })
    }

    async update(id: number, body: IEquipment) {
        return await this.equipmentEntity.update(id, body)
    }

    async reportDamaged(id: number, body: boolean) {
        return await this.equipmentEntity.update(id, { damaged: body })
    }

    async delete(id: number) {
        return await this.equipmentEntity.delete(id)
    }
}