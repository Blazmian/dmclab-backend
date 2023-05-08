import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Career } from "./career.entity";
import { Enrolled } from "./enrolled.entity";
import { Loan } from "./loan.entity";

@Entity()
export class Student {
    @PrimaryColumn()
    control_number: number

    @Column({ length: 50 })
    name: string

    @Column({ length: 30 })
    first_last_name: string

    @Column({ length: 30 })
    second_last_name: string

    @ManyToOne(() => Career, (career) => career.id)
    career: Career

    @Column()
    semester: number

    @Column("varbinary")
    fingerprint: string

    @Column()
    pin: number

    @Column()
    active: boolean

    @OneToMany(() => Enrolled, (enrolled) => enrolled.student)
    enrolled: Enrolled[]

    @OneToMany(() => Loan, (loan) => loan.student)
    loans: Loan[]
}