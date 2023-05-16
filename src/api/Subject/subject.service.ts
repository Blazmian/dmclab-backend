import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject as SubjectEntity } from 'src/entities/subject.entity';
import { IValidateSubject } from 'src/models/Subject';
import { Repository } from 'typeorm';
import { CareerService } from '../Career/career.service';
import { TeacherService } from '../Teacher/teacher.service';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(SubjectEntity)
        private subjectEntity: Repository<SubjectEntity>,
        private careerService: CareerService,
        private teacherService: TeacherService
    ) { }

    async validateSubject(subjects: IValidateSubject[]) {
        var noExists = []
        var existingSubjectNoChanges = []
        var existingSubjectWithChanges = { old: [], new: [] }
        for (const subject of subjects) {
            const existingSubject = await this.subjectEntity.findOne({ where: { id: subject.id }, relations: { career: true, teacher: true } })
            if (existingSubject) {
                if (existingSubject.subject === subject.subject &&
                    existingSubject.career.id === subject.career &&
                    existingSubject.teacher.control_number === subject.teacher) {
                    existingSubjectNoChanges.push(subject)
                }
                else {
                    existingSubjectWithChanges.old.push(existingSubject)
                    existingSubjectWithChanges.new.push(subject)
                }
            } else {
                noExists.push(subject)
            }
        }
        return {
            noExist: noExists,
            existWithChanges: existingSubjectWithChanges,
            existNoChanges: existingSubjectNoChanges
        }
    }

    async createSubject(subjectsData: IValidateSubject[]): Promise<SubjectEntity[]> {
        const newSubjects = []
        for (const subject of subjectsData) {
            const career = await this.careerService.get(subject.career)
            const teacher = await this.teacherService.get(subject.teacher)
            const newStudent = {
                ...subject,
                career: career,
                teacher: teacher
            }
            newSubjects.push(newStudent)
        }
        return await this.subjectEntity.save(newSubjects)
    }

    async get(id: number): Promise<SubjectEntity> {
        return await this.subjectEntity.findOne({ where: { id: id } })
    }
}