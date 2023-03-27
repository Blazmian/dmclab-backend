import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 10, unique: true })
    username: string

    @Column('text')
    password: string

    @Column({ default: 1 })
    canDelete: boolean

    @Column({ default: 1 })
    canUpdate: boolean
}