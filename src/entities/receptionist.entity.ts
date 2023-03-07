import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Loan } from "./loan.entity"
import { Staff } from "./staff.entity"

@Entity()
export class Receptionist {
    @PrimaryColumn()
    username : string

    @OneToOne(() => Staff)
    @JoinColumn()
    staff: Staff

    @Column() 
    password : string

    @Column()
    fingerprint : string

    @OneToMany(() => Loan, (loan) => loan.receptionist)
    loans : Loan[]
}