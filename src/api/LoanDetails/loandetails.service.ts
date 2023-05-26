import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from 'src/entities/equipment.entity';
import { LoanDetails as LoanDetailsEntity } from 'src/entities/loan.details.entity';
import { Loan } from 'src/entities/loan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoanDetailsService {

    constructor(
        @InjectRepository(LoanDetailsEntity)
        private loanDetailsEntity: Repository<LoanDetailsEntity>
    ) { }

    async create(loan: Loan, equipments: Equipment[]) {
        for (const equipment of equipments) {
            const res = await this.loanDetailsEntity.save(
                {
                    loan: loan,
                    equipment: equipment
                })
            if (res) {
                continue
            } else {
                return false
            }
        }

        return true
    }
}
