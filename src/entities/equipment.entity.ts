import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { LoanDetails } from "./loan.details.entity"

@Entity()
export class Equipment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length : 50 })
    equipment_name: string
    
    @Column({ length : 30})
    brand: string

    @Column({ length : 30})
    model: string

    @Column({length : 50})
    serial_number: string

    @Column()
    projector: boolean 

    @Column()
    extension: boolean

    @Column()
    hdmi: boolean

    @Column()
    damaged: boolean

    @OneToMany(() => LoanDetails, (details) => details.equipment)
    details: LoanDetails[]
}