import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Loan } from "./loan.entity"
import { Staff } from "./staff.entity"

@Entity()
export class Receptionist {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 10, unique: true })
    username: string

    @Column('text')
    password: string

    @Column("varbinary")
    fingerprint: string

    @OneToMany(() => Loan, (loan) => loan.receptionist)
    loans: Loan[]
}