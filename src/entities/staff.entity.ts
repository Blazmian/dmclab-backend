import { Entity, PrimaryColumn, Column} from "typeorm"

@Entity()
export class Staff {
    @PrimaryColumn()
    id : number

    @Column()
    name : string

    @Column()
    first_last_name : string
    
    @Column()
    second_last_name : string
}