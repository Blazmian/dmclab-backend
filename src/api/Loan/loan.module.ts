import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from 'src/entities/loan.entity';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { SubjectService } from '../Subject/subject.service';
import { StudentService } from '../Student/student.service';
import { TeacherService } from '../Teacher/teacher.service';
import { CareerService } from '../Career/career.service';
import { EquipmentService } from '../Equipment/equipment.service';
import { LoanDetailsService } from '../LoanDetails/loandetails.service';
import { Subject } from 'src/entities/subject.entity';
import { Student } from 'src/entities/student.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Career } from 'src/entities/career.entity';
import { Equipment } from 'src/entities/equipment.entity';
import { LoanDetails } from 'src/entities/loan.details.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Loan, Subject, Student, Teacher, Career, Equipment, LoanDetails])],
    controllers: [LoanController],
    providers: [LoanService, SubjectService, StudentService, TeacherService, CareerService, EquipmentService, LoanDetailsService],
    exports: [TypeOrmModule]
})
export class LoanModule { }
