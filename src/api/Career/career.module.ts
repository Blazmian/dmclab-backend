import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Career } from 'src/entities/career.entity';
import { CareerController } from './career.controller';
import { CareerService } from './career.service';

@Module({
    imports: [TypeOrmModule.forFeature([Career])],
    controllers: [CareerController],
    providers: [CareerService],
    exports: [TypeOrmModule]
})
export class CareerModule { }
