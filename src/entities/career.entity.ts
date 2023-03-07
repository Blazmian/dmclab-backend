import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Student } from "./student.entity"
import { Subject } from "./subject.entity"


@Entity()
export class Career {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    career : string

    @OneToMany(() => Subject, (subject) => subject.career)
    subjects : Subject[]

    @OneToMany(() => Student, (student) => student.career)
    students : Student[]
}