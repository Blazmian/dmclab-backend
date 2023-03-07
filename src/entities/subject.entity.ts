import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Career } from "./career.entity";
import { Enrolled } from "./enrolled.entity";
import { Loan } from "./loan.entity";
import { Teacher } from "./teacher.entity";

@Entity()
export class Subject {
    @PrimaryColumn()
    id : number

    @Column()
    subject : string

    @ManyToOne(() => Career, (career) => career.id)
    career : Career

    @ManyToOne(() => Teacher, (teacher) => teacher.control_number)
    teacher : Teacher

    @OneToMany(() => Enrolled, (enrolled) => enrolled.subject)
    enrolled : Enrolled[]
    
    @OneToMany(() => Loan, (loan) => loan.subject_id)
    loans : Loan[]
}