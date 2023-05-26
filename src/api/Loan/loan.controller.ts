import { Body, Controller, Post } from '@nestjs/common';
import { LoanService } from './loan.service';
import { ICreateLoan } from 'src/models/Loan';

@Controller('loan')
export class LoanController {
    constructor(private loanService: LoanService) { }

    @Post()
    async Create(@Body() data: ICreateLoan) {
        try {
            const res = await this.loanService.createLoan(data)
            if (res === true) {
                return true
            } else {
                return res
            }
        } catch (error) {
            return "Cannot generate loan: " + error
        }
    }
}
