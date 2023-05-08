import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/entities/subject.entity';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { CareerService } from '../Career/career.service';
import { TeacherService } from '../Teacher/teacher.service';
import { CareerModule } from '../Career/career.module';
import { TeacherModule } from '../Teacher/teacher.module';

@Module({
    imports: [TypeOrmModule.forFeature([Subject]), CareerModule, TeacherModule],
    controllers: [SubjectController],
    providers: [SubjectService, CareerService, TeacherService],
    exports: [TypeOrmModule]
})
export class SubjectModule { }
