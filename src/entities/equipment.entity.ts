import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm"
import { LoanDetails } from "./loan.details.entity"

@Entity()
export class Equipment {
    @PrimaryColumn()
    id : number

    @Column()
    equipment_name : string
    
    @Column()
    brand : string

    @Column()
    model : string

    @Column()
    serial_number : string

    @Column()
    projector : boolean 

    @Column()
    extension : boolean

    @Column()
    hdmi : boolean

    @OneToMany(() => LoanDetails, (details) => details.equipment)
    details : LoanDetails[]
}