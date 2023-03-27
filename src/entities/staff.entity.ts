import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Admin } from "./admin.entity"
import { Receptionist } from "./receptionist.entity"

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    name: string

    @Column({ length: 30 })
    first_last_name: string

    @Column({ length: 30 })
    second_last_name: string

    @OneToOne(() => Admin)
    @JoinColumn()
    admin: Admin

    @OneToOne(() => Receptionist)
    @JoinColumn()
    receptionist: Receptionist
}