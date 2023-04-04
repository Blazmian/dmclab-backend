import { User } from "src/entities/user.entity"

export interface IStaff {
    name : string
    first_last_name : string
    second_last_name : string
}

export interface IStaffAll {
    name : string
    first_last_name : string
    second_last_name : string
    user: User
}