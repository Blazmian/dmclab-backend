import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Loan } from "./loan.entity"
import { Staff } from "./staff.entity"

@Entity()
export class Receptionist {
    @PrimaryColumn("varchar", {length : 10})
    username : string

    @OneToOne(() => Staff)
    @JoinColumn()
    staff: Staff

    @Column({ length : 15 }) 
    password : string

    @Column("varbinary")
    fingerprint : string

    @OneToMany(() => Loan, (loan) => loan.receptionist)
    loans : Loan[]
}