import { Body, Controller, Post } from '@nestjs/common';
import { IValidateEnrolled } from 'src/models/Enrolled';
import { EnrolledService } from './enrolled.service';

@Controller('enrolled')
export class EnrolledController {
    constructor(private enrolledService: EnrolledService) {

    }

    @Post('/validate')
    validateNewEnrolled(@Body() enrolleds: IValidateEnrolled[]) {
        try {
            const res = this.enrolledService.validateEnrolleds(enrolleds)
            return res
        } catch (error) {
            return "Cannot validate enrolleds: " + error
        }
    }

    @Post('/create_many')
    CreateEnrolleds(@Body() params: IValidateEnrolled[]): string | boolean {
        try {
            this.enrolledService.createEnrolled(params)
            console.log("Enrolleds created!")
            return true
        } catch (error) {
            return "Cannot create enrolleds: " + error
        }
    }
}
