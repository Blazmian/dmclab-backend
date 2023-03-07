import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Staff } from "./staff.entity"

@Entity()
export class Admin {
    @PrimaryColumn()
    username : string

    @OneToOne(() => Staff)
    @JoinColumn()
    staff: Staff

    @Column() 
    password : string
}