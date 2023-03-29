import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { StaffModule } from '../Staff/staff.module';
import { StaffService } from '../Staff/staff.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    imports: [StaffModule, TypeOrmModule.forFeature([Admin])],
    controllers: [AdminController],
    providers: [AdminService, StaffService],
    exports: [TypeOrmModule]
})
export class AdminModule { }
