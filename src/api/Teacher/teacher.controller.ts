import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IValidateTeacher } from 'src/models/Teacher';
import { TeacherService } from './teacher.service';
import { Teacher } from 'src/entities/teacher.entity';

@Controller('teachers')
export class TeacherController {
    constructor(private teacherService: TeacherService) {

    }

    @Post('/validate')
    validateNewTeachers(@Body() teachers: IValidateTeacher[]) {
        try {
            const res = this.teacherService.validateTeachers(teachers)
            return res
        } catch (error) {
            return "Cannot validate teachers: " + error
        }
    }

    @Post('/create_many')
    CreateTeachers(@Body() params: IValidateTeacher[]): string | boolean {
        try {
            this.teacherService.createTeacher(params)
            console.log("Teachers created!")
            return true
        } catch (error) {
            return "Cannot create teachers: " + error
        }
    }

    @Get('/one/:id')
    getCareer(@Param('id') params): Promise<Teacher> | string {
        try {
            const res = this.teacherService.get(params)
            return res
        } catch (error) {
            return "Cannot read teachers: " + error
        }
    }
    @Get('/all')
    async getTeachers(): Promise<Teacher[] | string> {
        try {
            const teachers = await this.teacherService.getAll();
            console.log(teachers);
            return teachers;
        } catch (error) {
            console.error(error);
            return "Cannot read users: " + error.message;
        }
    }
}
