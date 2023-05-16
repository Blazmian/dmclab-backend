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

    @Post('/create_many')
    CreateStudents(@Body() params: IValidateStudent[]): string | boolean {
        try {
            this.studentService.createStudent(params)
            console.log("Students created!")
            return true
        } catch (error) {
            return "Cannot create students: " + error
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
}