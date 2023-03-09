import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Receptionist } from 'src/entities/receptionist.entity';
import { IReceptionist } from 'src/models/Receptionist';
import { ReceptionistService } from './receptionist.service';

@Controller('receptionist')
export class ReceptionistController {
    constructor (private receptionistService : ReceptionistService) {}

    @Post()
    Create(@Body() params : IReceptionist) {
        try {
            const res = this.receptionistService.create(params)
            console.log("Receptionist created")
            return true
        } catch (error) {
            return "Cannot create receptionist: " + error
        }
    }

    @Get('all')
    getReceptionists() : Promise<Receptionist[]> | string {
        try {
            const res = this.receptionistService.getAll()
            return res
        } catch (error) {
            return "Cannot read receptionists: " + error
        }
    }

    @Get('one/:username')
    getReceptionist(@Param('username') params) : Promise<Receptionist[]> | string {
        try {
            const res = this.receptionistService.get(params)
            return res
        } catch (error) {
            return "Cannot read receptionist: " + error
        }
    }

    @Put('update/:username')
    updateReceptionist(@Param('username') username : string, @Body() params : IReceptionist) {
        try {
            const res = this.receptionistService.update(username, params)
            return res
        } catch (error) {
            return "Cannot update receptionist: " + error            
        }
    }

    @Put('fingerprint/:username')
    submitFingerprintReceptionist(@Param('username') username : string, @Body() params : string) {
        try {
            const res = this.receptionistService.submitFingerprint(username, params)
            return res
        } catch (error) {
            return "Cannot submit receptionist fingerprint: " + error            
        }
    }

    @Delete('delete/:username')
    deleteReceptionist(@Param('username') params) {
        try {
            const res = this.receptionistService.delete(params)
            return res
        } catch (error) {
            return "Cannot delete receptionist: " + error
        }
    }
}