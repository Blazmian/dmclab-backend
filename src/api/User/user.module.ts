import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { StaffModule } from '../Staff/staff.module';
import { StaffService } from '../Staff/staff.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [StaffModule, TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, StaffService],
    exports: [TypeOrmModule]
})
export class UserModule {}