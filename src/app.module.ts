import { AuthController } from './api/Auth/auth.controller';
import { AuthModule } from './api/Auth/auth.module';
import { AuthService } from './api/Auth/auth.service';
import { EquipmentModule } from './api/Equipment/equipment.module';
import { EquipmentService } from './api/Equipment/equipment.service';
import { EquipmentController } from './api/Equipment/equipment.controller';
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
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    EquipmentModule,
    ReceptionistModule,
    StaffModule,
    AdminModule,
    CareerModule,
    StudentModule,
    Connection],
  controllers: [
    AuthController,
    EquipmentController,
    ReceptionistController,
    StaffController,
    AdminController,
    CareerController,
    StudentController, AppController],
  providers: [
    JwtService,
    AuthService,
    EquipmentService,
    ReceptionistService,
    StaffService,
    AdminService,
    CareerService,
    StudentService, AppService, ],
})
export class AppModule { }
