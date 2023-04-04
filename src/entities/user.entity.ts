import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Loan } from "./loan.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 10, unique: true })
    username: string

    @Column('text')
    password: string

    @Column("varbinary")
    fingerprint: string

    @OneToMany(() => Loan, (loan) => loan.user)
    loans: Loan[]
}