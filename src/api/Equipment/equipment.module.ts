import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from 'src/entities/equipment.entity';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';

@Module({
    imports: [TypeOrmModule.forFeature([Equipment])],
    controllers: [EquipmentController],
    providers: [EquipmentService],
    exports: [TypeOrmModule]
})
export class EquipmentModule {}
