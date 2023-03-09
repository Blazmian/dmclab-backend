import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff.entity';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
    imports: [TypeOrmModule.forFeature([Staff])],
    controllers: [StaffController],
    providers: [StaffService],
    exports: [TypeOrmModule]
})
export class StaffModule {}
