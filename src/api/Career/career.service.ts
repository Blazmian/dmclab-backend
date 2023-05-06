import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Career as CareerEntity } from 'src/entities/career.entity';
import { ICareer, IValidateCareer } from 'src/models/Career';
import { Repository } from 'typeorm';

@Injectable()
export class CareerService {

    constructor(
        @InjectRepository(CareerEntity)
        private careerEntity: Repository<CareerEntity>
    ) { }

    async validateCareer(careers: IValidateCareer[]) {
        var noExists = []
        var existingCareerNoChanges = []
        var existingCareerWithChanges = {}
        for (const career of careers) {
            const existingCareer = await this.careerEntity.findOne({ where: { id: career.id } })
            if (existingCareer) {
                if (existingCareer.career === career.career) {
                    existingCareerNoChanges.push(career)
                }
                else {
                    existingCareerWithChanges = Object.assign(existingCareerWithChanges, { career: existingCareer, newCareer: career })
                }
            } else {
                noExists.push(career)
            }
        }
        return {
            noExist: noExists,
            existWithChanges: existingCareerWithChanges,
            existNoChanges: existingCareerNoChanges
        }
    }

    async create(career: ICareer) {
        return await this.careerEntity.insert(career)
    }

    async getAll(): Promise<CareerEntity[]> {
        return await this.careerEntity.find()
    }

    async get(id: number): Promise<CareerEntity[]> {
        return await this.careerEntity.find({
            where: { id: id }
        })
    }
}