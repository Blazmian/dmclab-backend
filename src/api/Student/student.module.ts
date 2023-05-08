import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CareerModule } from '../Career/career.module';
import { CareerService } from '../Career/career.service';

@Module({
    imports: [TypeOrmModule.forFeature([Student]), CareerModule],
    controllers: [StudentController],
    providers: [StudentService, CareerService],
    exports: [TypeOrmModule]
})
export class StudentModule {}
