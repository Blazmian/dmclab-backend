import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrolled } from 'src/entities/enrolled.entity';
import { StudentModule } from '../Student/student.module';
import { SubjectModule } from '../Subject/subject.module';
import { EnrolledController } from './enrolled.controller';
import { EnrolledService } from './enrolled.service';
import { StudentService } from '../Student/student.service';
import { SubjectService } from '../Subject/subject.service';
import { CareerService } from '../Career/career.service';
import { CareerModule } from '../Career/career.module';
import { TeacherModule } from '../Teacher/teacher.module';
import { TeacherService } from '../Teacher/teacher.service';

@Module({
    imports: [TypeOrmModule.forFeature([Enrolled]), StudentModule, SubjectModule, CareerModule, TeacherModule],
    controllers: [EnrolledController],
    providers: [EnrolledService, StudentService, SubjectService, CareerService, TeacherService],
    exports: [TypeOrmModule]
})
export class EnrolledModule { }
