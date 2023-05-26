import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { LoanDetails } from "./loan.details.entity"
import { User } from "./user.entity"
import { Student } from "./student.entity"
import { Subject } from "./subject.entity"
import { Teacher } from "./teacher.entity"

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    folio: number

    @ManyToOne(() => Student, (student) => student.control_number)
    student: Student

    @ManyToOne(() => Teacher, (teacher) => teacher.control_number)
    teacher: Teacher

    @ManyToOne(() => User, (user) => user.username)
    user: User

    @ManyToOne(() => Subject, (subject) => subject.id)
    subject: Subject

    @Column("date")
    date: Date

    @Column()
    hours: number

    @Column({ length: 10 })
    class: string

    @Column({ default: 1 })
    members: number

    @Column({ default: false })
    delivered: boolean

    @Column("time")
    delivery_time: Date

    @Column({ default: false })
    returned: boolean

    @Column("time")
    return_time: Date

    @OneToMany(() => LoanDetails, (details) => details.loan)
    details: LoanDetails[]
}