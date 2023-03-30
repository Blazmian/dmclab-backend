import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receptionist } from 'src/entities/receptionist.entity';
import { StaffModule } from '../Staff/staff.module';
import { StaffService } from '../Staff/staff.service';
import { ReceptionistController } from './receptionist.controller';
import { ReceptionistService } from './receptionist.service';

@Module({
    imports: [StaffModule, TypeOrmModule.forFeature([Receptionist])],
    controllers: [ReceptionistController],
    providers: [ReceptionistService, StaffService],
    exports: [TypeOrmModule]
})
export class ReceptionistModule {}