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
}
