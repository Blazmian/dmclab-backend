import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { LoanDetails } from "./loan.details.entity"
import { User } from "./user.entity"
import { Student } from "./student.entity"
import { Subject } from "./subject.entity"

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    folio : number 

    @ManyToOne(() => Student, (student) => student.control_number)
    student : Student
    
    @ManyToOne(() => User, (user) => user.username)
    user : User
    
    @ManyToOne(() => Subject, (subject) => subject.id)
    subject_id : Subject
    
    @Column("date")
    date : Date
    
    @Column()
    hours : number
    
    @Column({ length : 10 })
    class : string
    
    @Column()
    members : number
    
    @Column()
    delivered : boolean

    @Column("time")
    delivery_time : Date
    
    @Column()
    returned : boolean

    @Column("time")
    return_time : Date

    @OneToMany(() => LoanDetails, (details) => details.loan)
    details : LoanDetails[]
}