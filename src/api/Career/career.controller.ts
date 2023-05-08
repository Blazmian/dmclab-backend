import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Career } from 'src/entities/career.entity';
import { ICareer, IValidateCareer } from 'src/models/Career';
import { CareerService } from './career.service';

@Controller('career')
export class CareerController {
    constructor(private careerService: CareerService) {

    }

    @Post()
    Create(@Body() params: ICareer): string | boolean {
        try {
            this.careerService.create(params)
            console.log("Career created!")
            return true
        } catch (error) {
            return "Cannot create career: " + error
        }
    }

    @Post('/create_many')
    CreateCareers(@Body() params: IValidateCareer[]): string | boolean {
        try {
            this.careerService.createCareer(params)
            console.log("Careers created!")
            return true
        } catch (error) {
            return "Cannot create careers: " + error
        }
    }

    @Post('/validate')
    validateNewCareers(@Body() careers: IValidateCareer[]) {
        try {
            const res = this.careerService.validateCareer(careers)
            return res
        } catch (error) {
            return "Cannot validate careers: " + error
        }
    }

    @Get('/all')
    getCareers(): Promise<Career[]> | string {
        try {
            const res = this.careerService.getAll()
            return res
        } catch (error) {
            return "Cannot read careers: " + error
        }
    }

    @Get('/one/:id')
    getCareer(@Param('id') params): Promise<Career> | string {
        try {
            const res = this.careerService.get(params)
            return res
        } catch (error) {
            return "Cannot read careers: " + error
        }
    }
}