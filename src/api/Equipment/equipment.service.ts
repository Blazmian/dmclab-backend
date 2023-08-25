import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment, Equipment as EquipmentEntity } from 'src/entities/equipment.entity';
import { IEquipment, IEquipmentAll } from 'src/models/Equipment';
import { Repository, UpdateResult } from 'typeorm';
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class EquipmentService {

    constructor(
        @InjectRepository(EquipmentEntity)
        private equipmentEntity: Repository<EquipmentEntity>) { }

    async create(equipment: IEquipment) {
        if (!fs.existsSync(`${process.cwd()}/temp`)) {
            fs.mkdirSync(`${process.cwd()}/temp`);
        }

        const newEquipment = new EquipmentEntity()
        newEquipment.equipment_name = equipment.equipment_name
        newEquipment.equipment_number = equipment.equipment_number
        newEquipment.brand = equipment.brand
        newEquipment.model = equipment.model
        newEquipment.serial_number = equipment.serial_number
        newEquipment.projector = equipment.projector
        newEquipment.extension = equipment.extension
        newEquipment.hdmi = equipment.hdmi
        newEquipment.damaged = equipment.damaged

        if (equipment.photo) {
            const tempFileName = uuidv4()
            const tempFilePath = `${process.cwd()}/temp/${tempFileName}`
            fs.writeFileSync(tempFilePath, equipment.photo)
            newEquipment.photo = fs.readFileSync(tempFilePath)
            fs.unlinkSync(tempFilePath)
        }

        const res = await this.equipmentEntity.save(newEquipment)

        return res
    }

    async getAll(): Promise<EquipmentEntity[]> {
        return await this.equipmentEntity.find({
            select: ['id', 'equipment_name', 'equipment_number', 'brand', 'model', 'serial_number', 'projector', 'extension', 'hdmi', 'damaged', 'borrowed']
        })
    }

    async get(id: number): Promise<EquipmentEntity[]> {
        return await this.equipmentEntity.find(
            {
                where: { id: id }
            })
    }

    async getEquipmentForOrder(): Promise<EquipmentEntity[]> {
        return await this.equipmentEntity.find(
            {
                where: {
                    projector: false,
                    borrowed: false,
                    damaged: false
                },
                select: ['id', 'equipment_name', 'equipment_number'],
                order: { equipment_name: 'ASC' }
            })
    }

    async getProjectorForOrder(): Promise<EquipmentEntity[]> {
        return await this.equipmentEntity.find(
            {
                where: {
                    projector: true,
                    borrowed: false,
                    damaged: false
                },
                select: ['id', 'equipment_name', 'equipment_number', 'hdmi']
            })
    }

    async getEquipmentNotBorrowed(name: string): Promise<EquipmentEntity[]> {
        return await this.equipmentEntity.find(
            {
                where: {
                    equipment_name: name,
                    borrowed: false,
                    damaged: false
                },
                select: ['id', 'equipment_name', 'equipment_number', 'hdmi']
            })
    }

    async getEquipmentPhoto(id: number): Promise<Buffer> {
        const res = await this.equipmentEntity.findOne({
            where: { id: id },
            select: ['photo'],
        })
        return res.photo
    }

    async getUndamagedEquipment(): Promise<EquipmentEntity[]> {
        return await this.equipmentEntity.find({
            where: { damaged: false }
        })
    }

    async getDamagedEquipment(): Promise<EquipmentEntity[]> {
        return await this.equipmentEntity.find({
            where: { damaged: true }
        })
    }

    async changeEquipmentDamaged(id: number): Promise<UpdateResult> {
        const res = await this.equipmentEntity.findOne({
            where: { id: id }
        })

        res.damaged = !res.damaged
        return this.update(id, res)
    }

    async update(id: number, body: IEquipment) {
        return await this.equipmentEntity.update(id, body)
    }

    async updateBorrow(equipments: IEquipmentAll[]) {
        const newEquipments = []
        for (const equipment of equipments) {
            equipment.borrowed = !equipment.borrowed
            newEquipments.push(equipment)
        }
        return await this.equipmentEntity.save(newEquipments)
    }
    async updateEq(id: number, equipment: Equipment): Promise<Equipment> {
        const existingEq = await this.equipmentEntity.findOne({ where: { id: id } });
        if (!existingEq) {
            throw new NotFoundException(`Equipo con ID ${id} no encontrado`);
        }

        // Actualizar los datos del usuario con los nuevos valores
        existingEq.equipment_name = equipment.equipment_name;
        existingEq.equipment_number = equipment.equipment_number;
        existingEq.brand = equipment.brand;
        existingEq.model = equipment.model;
        existingEq.serial_number = equipment.serial_number;
        //obtener la foto 
        existingEq.photo = equipment.photo;

        // Guardar los cambios en la base de datos
        await this.equipmentEntity.save(existingEq);

        return existingEq;
    }
    async reportDamaged(id: number, body: boolean) {
        return await this.equipmentEntity.update(id, { damaged: body })
    }

    async delete(id: number) {
        return await this.equipmentEntity.delete(id)
    }
}