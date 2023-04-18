import { User } from "src/entities/user.entity"

export interface IStaff {
    name : string
    first_last_name : string
    second_last_name : string
    photo: Buffer
}

export interface IStaffAll {
    name : string
    first_last_name : string
    second_last_name : string
    admin: boolean
    receptionist: boolean
    user: User[]
}