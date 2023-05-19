import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { IValidateSubject } from 'src/models/Subject';
import { Subject } from 'src/entities/subject.entity';

@Controller('subject')
export class SubjectController {
    constructor(private subjectService: SubjectService) {

    }

    @Post('/validate')
    validateNewSubject(@Body() subjects: IValidateSubject[]) {
        try {
            const res = this.subjectService.validateSubject(subjects)
            return res
        } catch (error) {
            return "Cannot validate subjects: " + error
        }
    }

    @Post('/create_many')
    CreateSubjects(@Body() params: IValidateSubject[]): string | boolean {
        try {
            this.subjectService.createSubject(params)
            console.log("Subjects created!")
            return true
        } catch (error) {
            return "Cannot create subjects: " + error
        }
    }

    @Get('/one/:id')
    getSubject(@Param('id') id: number): Promise<Subject> | string {
        try {
            return this.subjectService.get(id)
        } catch (error) {
            return "Cannot read subjects: " + error
        }
    }

    @Get('/teacher/:id')
    getTeacherSubject(@Param('id') id: number): Promise<Subject> | string {
        try {
            return this.subjectService.getTeacherSubject(id)
        } catch (error) {
            return "Cannot read subjects: " + error
        }
    }
}