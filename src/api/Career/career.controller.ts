import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Career } from 'src/entities/career.entity';
import { ICareer } from 'src/models/Career';
import { CareerService } from './career.service';

@Controller('career')
export class CareerController {
    constructor(private careerService : CareerService){

    }

    @Post()
    Create(@Body() params : ICareer) : string | boolean {
        try {
            this.careerService.create(params)
            console.log("Career created!")
            return true
        } catch (error) {
            return "Cannot create client: " + error
        }
    }

    @Get('/all')
    getCareers() : Promise<Career[]> | string {
        try {
            const res = this.careerService.getAll()
            return res
        } catch (error) {
            return "Cannot read careers: " + error
        }
    }

    @Get('/one/:id')
    getCareer(@Param('id') params) : Promise<Career[]> | string {
        try {
            const res = this.careerService.get(params)
            return res
        } catch (error) {
            return "Cannot read careers: " + error
        }
    }
}