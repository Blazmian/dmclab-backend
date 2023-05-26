import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get('/not-delivered')
    getNotDelivered() {
        try {
            return this.loanService.getNotDelivered()
        } catch (error) {
            return "Cannot read loans: " + error
        }
    }

    @Post('/deliver-loan/:folio')
    async deliverLoan(@Param('folio') params) {
        try {
            const res = await this.loanService.setDelivered(params)
            return res
        } catch (error) {
            return "Cannot read loans: " + error
        }
    }
}
