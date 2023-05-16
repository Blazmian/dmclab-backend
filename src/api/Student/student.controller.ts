import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { IValidateStudent } from 'src/models/Student';
import { Student } from 'src/entities/student.entity';

@Controller('student')
export class StudentController {
    constructor(private studentService: StudentService) {

    }

    @Post('/validate')
    validateNewStudent(@Body() students: IValidateStudent[]) {
        try {
            const res = this.studentService.validateStudents(students)
            return res
        } catch (error) {
            return "Cannot validate students: " + error
        }
    }

    @Get('/one/:id')
    getStudent(@Param('id') control_number: number): Promise<Student> | string {
        try {
            return this.studentService.get(control_number)            
        } catch (error) {
            return "Cannot read students: " + error
        }
    }
    @Get('/all')
    async getStudents(): Promise< string | Student[]>{
        try {
            const res = await this.studentService.getAll()
            console.log(res)
            return res
        } catch (error) {
            return "Cannot read user: " + error
        }
    }
}
