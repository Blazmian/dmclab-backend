import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Student } from "./student.entity"
import { Subject } from "./subject.entity"

@Entity()
export class Enrolled {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(() => Student, (student) => student.control_number)
    student : Student

    @ManyToOne(() => Subject, (subject) => subject.id)
    subject : Subject
}