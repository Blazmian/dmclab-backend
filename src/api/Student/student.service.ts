import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student as StudentEntity } from 'src/entities/student.entity';
import { IValidateStudent } from 'src/models/Student';
import { Repository } from 'typeorm';
import { CareerService } from '../Career/career.service';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private studentEntity: Repository<StudentEntity>,
        private careerService: CareerService
    ) { }

    async validateStudents(students: IValidateStudent[]) {
        var noExists = []
        var existingStudentNoChanges = []
        var existingStudentWithChanges = {}
        for (const student of students) {
            const existingStudent = await this.studentEntity.findOne({ where: { control_number: student.control_number } })
            if (existingStudent) {
                const career = await this.careerService.get(student.career)
                if (existingStudent.name === student.name &&
                    existingStudent.first_last_name === student.first_last_name &&
                    existingStudent.second_last_name === student.second_last_name &&
                    existingStudent.semester === student.semester &&
                    existingStudent.active === student.active &&
                    existingStudent.career === career &&
                    existingStudent.pin === student.pin) {
                    existingStudentNoChanges.push(student)
                }
                else {
                    existingStudentWithChanges = Object.assign(existingStudentWithChanges, { teacher: existingStudent, newTeacher: student })
                }
            } else {
                noExists.push(student)
            }
        }
        return {
            noExist: noExists,
            existWithChanges: existingStudentWithChanges,
            existNoChanges: existingStudentNoChanges
        }
    }

    async get(control_number: number): Promise<StudentEntity> {
        return await this.studentEntity.findOne({ where: { control_number: control_number } })
    }
}
