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
        var existingSubjectWithChanges = {}
        for (const subject of subjects) {
            const existingSubject = await this.subjectEntity.findOne({ where: { id: subject.id } })
            const career = await this.careerService.get(subject.career)
            const teacher = await this.teacherService.get(subject.teacher)
            if (existingSubject) {
                if (existingSubject.subject === subject.subject &&
                    existingSubject.career === career &&
                    existingSubject.teacher === teacher) {
                    existingSubjectNoChanges.push(subject)
                }
                else {
                    existingSubjectWithChanges = Object.assign(existingSubjectWithChanges, { teacher: existingSubject, newTeacher: subject })
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

    async get(id: number): Promise<SubjectEntity> {
        return await this.subjectEntity.findOne({ where: { id: id } })
    }
}