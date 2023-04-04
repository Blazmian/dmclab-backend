import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "./user.entity"

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

    @Column('blob')
    photo: string

    @Column({ default: false })
    admin: boolean

    @Column({ default: false })
    receptionist: boolean

    @OneToMany(() => User, (user) => user.staff)
    user: User[]
}