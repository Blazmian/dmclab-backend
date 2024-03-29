import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Equipment } from "./equipment.entity"
import { Loan } from "./loan.entity"

@Entity()
export class LoanDetails {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(() => Loan, (loan) => loan.details)
    loan : Loan

    @ManyToOne(() => Equipment, (equipment) => equipment.id)
    equipment : Equipment 
}