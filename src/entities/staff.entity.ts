import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    id : number

    @Column({ length : 50 })
    name : string

    @Column({ length : 30 })
    first_last_name : string
    
    @Column({ length : 30 })
    second_last_name : string
}