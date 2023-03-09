import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receptionist } from 'src/entities/receptionist.entity';
import { ReceptionistController } from './receptionist.controller';
import { ReceptionistService } from './receptionist.service';

@Module({
    imports: [TypeOrmModule.forFeature([Receptionist])],
    controllers: [ReceptionistController],
    providers: [ReceptionistService],
    exports: [TypeOrmModule]
})
export class ReceptionistModule {}