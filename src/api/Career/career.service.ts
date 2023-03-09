import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Career as CareerEntity } from 'src/entities/career.entity';
import { ICareer } from 'src/models/Career';
import { Repository } from 'typeorm';

@Injectable()
export class CareerService {

    constructor (
        @InjectRepository(CareerEntity)
        private careerEntity : Repository<CareerEntity>
    ) {}

    async create (career : ICareer) {
        return await this.careerEntity.insert(career)
    }

    async getAll() : Promise<CareerEntity[]> {
        return await this.careerEntity.find()
    }

    async get(id : number) : Promise<CareerEntity[]> {
        return await this.careerEntity.find({
            where : {id : id}
        })
    }
}