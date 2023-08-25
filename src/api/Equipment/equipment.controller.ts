import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Equipment } from 'src/entities/equipment.entity';
import { IEquipment } from 'src/models/Equipment';
import { EquipmentService } from './equipment.service';
import { Response } from 'express';
import { UpdateResult } from 'typeorm';

@Controller('equipment')
export class EquipmentController {
    constructor(private equipmentService: EquipmentService) { }

    @Post()
    Create(@Body() params: IEquipment) {
        try {
            const res = this.equipmentService.create(params)
            console.log("Equipment created")
            return true
        } catch (error) {
            return "Cannot create equipment: " + error
        }
    }

    @Get('all')
    getEquipments(): Promise<Equipment[]> | string {
        try {
            const res = this.equipmentService.getAll()
            return res
        } catch (error) {
            return "Cannot read equipments: " + error
        }
    }

    @Get('one/:id')
    getEquipment(@Param('id') params): Promise<Equipment[]> | string {
        try {
            const res = this.equipmentService.get(params)
            return res
        } catch (error) {
            return "Cannot read equipments: " + error
        }
    }

    @Get('/equipment-order')
    getEquipmentOrder(): Promise<Equipment[]> | string {
        try {
            return this.equipmentService.getEquipmentForOrder()
        } catch (error) {
            return "Cannot read equipments: " + error
        }
    }

    @Get('/projector-order')
    getProjectorOrder(): Promise<Equipment[]> | string {
        try {
            return this.equipmentService.getProjectorForOrder()
        } catch (error) {
            return "Cannot read equipments: " + error
        }
    }

    @Get('one/photo/:id')
    async getEquipmentPhoto(@Param('id') params, @Res() res: Response): Promise<void | string> {
        try {
            const photo = await this.equipmentService.getEquipmentPhoto(params)
            res.set('Content-Type', 'image/*')
            res.send(photo)
        } catch (error) {
            return "Cannot read Equipment: " + error
        }
    }

    @Get('undamaged')
    getUndamagedEquipment(): Promise<Equipment[]> | string {
        try {
            const res = this.equipmentService.getUndamagedEquipment()
            return res
        } catch (error) {
            return "Cannot read equipments: " + error
        }
    }

    @Get('damaged')
    getDamagedEquipment(): Promise<Equipment[]> | string {
        try {
            const res = this.equipmentService.getDamagedEquipment()
            return res
        } catch (error) {
            return "Cannot read equipments: " + error
        }
    }

    @Put('damaged/:id')
    changeDamaged(@Param('id') id: number): Promise<UpdateResult> | string {
        try {
            const res = this.equipmentService.changeEquipmentDamaged(id)
            return res
        } catch (error) {
            return "Cannot change the equipment damage: " + error
        }
    }

    @Put('update/:id')
    updateEq(@Param('id') id: number, @Body() params: IEquipment) {
        try {
            const res = this.equipmentService.update(id, params)
            return res
        } catch (error) {
            return "Cannot update equipment: " + error
        }
    }

    @Put('report-damaged/:id')
    reportDamaged(@Param('id') id: number, @Body() params: boolean) {
        try {
            const res = this.equipmentService.reportDamaged(id, params)
            return res
        } catch (error) {
            return "Cannot change the equipment damage: " + error
        }
    }

    @Delete('delete/:id')
    deleteEquipment(@Param('id') params) {
        try {
            const res = this.equipmentService.delete(params)
            return res
        } catch (error) {
            return "Cannot delete equipment: " + error
        }
    }
}