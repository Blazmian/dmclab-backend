import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ILoginTeacher, IValidateTeacher } from 'src/models/Teacher';
import { TeacherService } from './teacher.service';
import { Teacher } from 'src/entities/teacher.entity';

@Controller('teacher')
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

    @Post('/login')
    loginTeacher(@Body() info: ILoginTeacher): Promise<Teacher | boolean> | string {
        try {
            return this.teacherService.loginTeacher(info)
        } catch (error) {
            return "Cannot login teacher: " + error
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
            return teachers;
        } catch (error) {
            console.error(error);
            return "Cannot read users: " + error.message;
        }
    }
}
