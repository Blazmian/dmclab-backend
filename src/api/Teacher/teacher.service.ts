import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher as TeacherEntity } from 'src/entities/teacher.entity';
import { IValidateTeacher } from 'src/models/Teacher';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
    constructor(
        @InjectRepository(TeacherEntity)
        private teacherEntity: Repository<TeacherEntity>
    ) { }

    async validateTeachers(teachers: IValidateTeacher[]) {
        var noExists = []
        var existingTeacherNoChanges = []
        var existingTeacherWithChanges = { old: [], new: [] }
        for (const teacher of teachers) {
            const existingTeacher = await this.teacherEntity.findOne({ where: { control_number: teacher.control_number } })
            if (existingTeacher) {
                if (existingTeacher.name === teacher.name &&
                    existingTeacher.first_last_name === teacher.first_last_name &&
                    existingTeacher.second_last_name === teacher.second_last_name &&
                    existingTeacher.pin === teacher.pin) {
                    existingTeacherNoChanges.push(teacher)
                }
                else {
                    existingTeacherWithChanges.old.push(existingTeacher)
                    existingTeacherWithChanges.new.push(teacher)
                }
            } else {
                noExists.push(teacher)
            }
        }
        return {
            noExist: noExists,
            existWithChanges: existingTeacherWithChanges,
            existNoChanges: existingTeacherNoChanges
        }
    }

    async createTeacher(teachersData: IValidateTeacher[]): Promise<TeacherEntity[]> {
        return await this.teacherEntity.save(teachersData)
    }

    async get(control_number: number): Promise<TeacherEntity> {
        return await this.teacherEntity.findOne({ where: { control_number: control_number } })
    }
}
