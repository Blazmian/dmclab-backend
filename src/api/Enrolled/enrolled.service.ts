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
        var existingEnrolledWithChanges = { old: [], new: [] }
        for (const enrolled of enrolleds) {
            const existingEnrolled = await this.enrolledEntity.findOne({ where: { id: enrolled.id }, relations: { student: true, subject: true } })
            if (existingEnrolled) {
                if (existingEnrolled.student.control_number === enrolled.student &&
                    existingEnrolled.subject.id === enrolled.subject) {
                    existingEnrolledNoChanges.push(enrolled)
                }
                else {
                    existingEnrolledWithChanges.old.push(existingEnrolled)
                    existingEnrolledWithChanges.new.push(enrolled)
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

    async createEnrolled(enrolledsData: IValidateEnrolled[]): Promise<EnrolledEntity[]> {
        const newEnrolleds = []
        for (const enrolled of enrolledsData) {
            const student = await this.studentService.get(enrolled.student)
            const subject = await this.subjectService.get(enrolled.subject)
            const newEnrolled = {
                ...enrolled,
                student: student,
                subject: subject
            }
            newEnrolleds.push(newEnrolled)
        }
        return await this.enrolledEntity.save(newEnrolleds)
    }
}
