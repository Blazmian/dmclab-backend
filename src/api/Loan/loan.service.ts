import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan as LoanEntity } from 'src/entities/loan.entity';
import { ICreateLoan } from 'src/models/Loan';
import { DeepPartial, Repository } from 'typeorm';
import { SubjectService } from '../Subject/subject.service';
import { StudentService } from '../Student/student.service';
import { TeacherService } from '../Teacher/teacher.service';
import { EquipmentService } from '../Equipment/equipment.service';
import { LoanDetailsService } from '../LoanDetails/loandetails.service';

@Injectable()
export class LoanService {

    constructor(
        @InjectRepository(LoanEntity)
        private loanEntity: Repository<LoanEntity>,
        private subjectService: SubjectService,
        private studentService: StudentService,
        private teacherService: TeacherService,
        private equipmentService: EquipmentService,
        private loanDetailsService: LoanDetailsService
    ) { }

    async createLoan(data: ICreateLoan): Promise<boolean | string> {
        const equipmentForBorrow = []
        for (const equipment of data.equipments) {
            const equipmentNotBorrowed = await this.equipmentService.getEquipmentNotBorrowed(equipment.name)
            if (equipmentNotBorrowed.length >= equipment.quantity) {
                for (let i = 0; i < equipment.quantity; i++) {
                    equipmentForBorrow.push(equipmentNotBorrowed[i])
                }
            } else {
                return equipment.name
            }
        }

        const date = new Date()
        let student = null, teacher = null
        if (data.student) {
            student = await this.studentService.get(data.student)
        }

        if (data.teacher) {
            teacher = await this.teacherService.get(data.teacher)
        }

        const subject = await this.subjectService.get(data.subject)

        const newLoan = {
            student: student,
            teacher: teacher,
            subject: subject,
            date: date,
            hours: data.hours,
            class: data.class,
            members: data.members,

        }
        try {
            const loan = await this.loanEntity.save(newLoan)
            const details = await this.loanDetailsService.create(loan, equipmentForBorrow)
            if (details) {
                return true
            }
            return false
        } catch (error) {
            return "Cannot submit the loan: " + error
        }
    }
}
