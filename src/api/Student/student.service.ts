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
        var existingStudentWithChanges = { old: [], new: [] }
        for (const student of students) {
            const existingStudent = await this.studentEntity.findOne({ where: { control_number: student.control_number }, relations: { career: true } })
            if (existingStudent) {
                if (existingStudent.name === student.name &&
                    existingStudent.first_last_name === student.first_last_name &&
                    existingStudent.semester === student.semester &&
                    existingStudent.active === student.active &&
                    existingStudent.pin === student.pin) {
                    existingStudentNoChanges.push(student)
                } else {
                    existingStudentWithChanges.old.push(existingStudent)
                    existingStudentWithChanges.new.push(student)
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

    async createStudent(studentsData: IValidateStudent[]): Promise<StudentEntity[]> {
        const newStudents = []
        for (const student of studentsData) {
            const career = await this.careerService.get(student.career)
            const newStudent = {
                ...student,
                career: career
            }
            newStudents.push(newStudent)
        }
        return await this.studentEntity.save(newStudents)
    }

    async get(control_number: number): Promise<StudentEntity> {
        return await this.studentEntity.findOne({ where: { control_number: control_number } })
    }
    
    async getAll(): Promise<StudentEntity[]> {
        return await this.studentEntity.find({ relations: ['career'] });
      }

}
