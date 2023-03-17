import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Staff } from "./staff.entity"

@Entity()
export class Admin {
    @PrimaryColumn("varchar", {length : 10})
    username : string

    @OneToOne(() => Staff)
    @JoinColumn()
    staff: Staff

    @Column('text') 
    password : string
}