import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { LoanDetails } from "./loan.details.entity"
import { Receptionist } from "./receptionist.entity"
import { Student } from "./student.entity"
import { Subject } from "./subject.entity"

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    folio : number 

    @ManyToOne(() => Student, (student) => student.control_number)
    student : Student
    
    @ManyToOne(() => Receptionist, (receptionist) => receptionist.username)
    receptionist : Receptionist
    
    @ManyToOne(() => Subject, (subject) => subject.id)
    subject_id : Subject
    
    @Column()
    date : Date
    
    @Column()
    hours : number
    
    @Column()
    class : string
    
    @Column()
    members : number
    
    @Column()
    delivered : boolean
    
    @Column()
    returned : boolean

    @OneToMany(() => LoanDetails, (details) => details.loan)
    details : LoanDetails[]
}