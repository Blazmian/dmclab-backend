import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm"
import { Subject } from "./subject.entity"


@Entity()
export class Teacher {
    @PrimaryColumn()
    control_number: number

    @Column({ length: 50 })
    name: string

    @Column({ length: 30 })
    first_last_name: string

    @Column({ length: 30 })
    second_last_name: string

    @Column({ length: 13 })
    rfc: string

    @Column("varbinary")
    fingerprint: string

    @Column()
    pin: number

    @OneToMany(() => Subject, (subject) => subject.teacher)
    subjects: Subject[]
}