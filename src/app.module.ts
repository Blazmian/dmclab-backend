import { ReceptionistController } from './api/Receptionist/receptionist.controller';
import { ReceptionistModule } from './api/Receptionist/receptionist.module';
import { ReceptionistService } from './api/Receptionist/receptionist.service';
import { StaffService } from './api/Staff/staff.service';
import { StaffModule } from './api/Staff/staff.module';
import { StaffController } from './api/Staff/staff.controller';
import { AdminService } from './api/Admin/admin.service';
import { AdminModule } from './api/Admin/admin.module';
import { AdminController } from './api/Admin/admin.controller';
import { CareerController } from './api/Career/career.controller';
import { CareerService } from './api/Career/career.service';
import { CareerModule } from './api/Career/career.module';
import { StudentService } from './api/Student/student.service';
import { StudentModule } from './api/Student/student.module';
import { StudentController } from './api/Student/student.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from './configs/DBConnection';

@Module({
  imports: [
    ReceptionistModule,
    StaffModule,
    AdminModule,
    CareerModule,
    StudentModule, Connection],
  controllers: [
    ReceptionistController,
    StaffController,
    AdminController,
    CareerController,
    StudentController, AppController],
  providers: [
    ReceptionistService,
    StaffService,
    AdminService,
    CareerService,
    StudentService, AppService],
})
export class AppModule { }
