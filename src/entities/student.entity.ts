import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Career } from "./career.entity";
import { Enrolled } from "./enrolled.entity";
import { Loan } from "./loan.entity";

@Entity()
export class Student {
    @PrimaryColumn()
    control_number : number

    @Column()
    name : string

    @Column()
    first_last_name : string

    @Column()
    second_last_name : string

    @ManyToOne(() => Career, (career) => career.id)
    career : Career

    @Column()
    fingerprint : string

    @Column()
    pin : number

    @OneToMany(() => Enrolled, (enrolled) => enrolled.student)
    enrolled : Enrolled[]

    @OneToMany(() => Loan, (loan) => loan.student)
    loans : Loan[]
}