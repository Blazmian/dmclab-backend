import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrolled as EnrolledEntity } from 'src/entities/enrolled.entity';
import { Repository } from 'typeorm';
import { StudentService } from '../Student/student.service';
import { IValidateEnrolled } from 'src/models/Enrolled';
import { SubjectService } from '../Subject/subject.service';

@Injectable()
export class EnrolledService {
    constructor(
        @InjectRepository(EnrolledEntity)
        private enrolledEntity: Repository<EnrolledEntity>,
        private subjectService: SubjectService,
        private studentService: StudentService
    ) { }

    async validateEnrolleds(enrolleds: IValidateEnrolled[]) {
        var noExists = []
        var existingEnrolledNoChanges = []
        var existingEnrolledWithChanges = {}
        for (const enrolled of enrolleds) {
            const existingEnrolled = await this.enrolledEntity.findOne({ where: { id: enrolled.id } })
            if (existingEnrolled) {
                const student = await this.studentService.get(enrolled.student)
                const subject = await this.subjectService.get(enrolled.subject)
                if (existingEnrolled.student === student &&
                    existingEnrolled.subject === subject) {
                    existingEnrolledNoChanges.push(enrolled)
                }
                else {
                    existingEnrolledWithChanges = Object.assign(existingEnrolledWithChanges, { teacher: existingEnrolled, newTeacher: enrolled })
                }
            } else {
                noExists.push(enrolled)
            }
        }
        return {
            noExist: noExists,
            existWithChanges: existingEnrolledWithChanges,
            existNoChanges: existingEnrolledNoChanges
        }
    }
}
