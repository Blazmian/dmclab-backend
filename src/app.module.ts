import { AuthController } from './api/Auth/auth.controller';
import { AuthModule } from './api/Auth/auth.module';
import { AuthService } from './api/Auth/auth.service';
import { EquipmentModule } from './api/Equipment/equipment.module';
import { EquipmentService } from './api/Equipment/equipment.service';
import { EquipmentController } from './api/Equipment/equipment.controller';
import { UserController } from './api/User/user.controller';
import { UserModule } from './api/User/user.module';
import { UserService } from './api/User/user.service';
import { StaffService } from './api/Staff/staff.service';
import { StaffModule } from './api/Staff/staff.module';
import { StaffController } from './api/Staff/staff.controller';
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
    UserModule,
    StaffModule,
    CareerModule,
    StudentModule,
    Connection],
  controllers: [
    AuthController,
    EquipmentController,
    UserController,
    StaffController,
    CareerController,
    StudentController, AppController],
  providers: [
    JwtService,
    AuthService,
    EquipmentService,
    UserService,
    StaffService,
    CareerService,
    StudentService, AppService, ],
})
export class AppModule { }
