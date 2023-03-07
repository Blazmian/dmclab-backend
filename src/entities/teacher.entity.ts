import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm"
import { Subject } from "./subject.entity"


@Entity()
export class Teacher {
    @PrimaryColumn()
    control_number : number

    @Column()
    name : string

    @Column()
    first_last_name : string

    @Column()
    second_last_name : string

    @Column()
    rfc : string

    @Column()
    fingerprint : string

    @Column()
    pin : number

    @OneToMany(() => Subject, (subject) => subject.teacher)
    subjects : Subject[]
}