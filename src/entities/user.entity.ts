import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Loan } from "./loan.entity"
import { Staff } from "./staff.entity"

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

    @ManyToOne(() => Staff, (staff) => staff.user)
    staff: Staff

    @OneToMany(() => Loan, (loan) => loan.user)
    loans: Loan[]
}