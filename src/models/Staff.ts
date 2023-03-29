import { Admin } from "src/entities/admin.entity"
import { Receptionist } from "src/entities/receptionist.entity"

export interface IStaff {
    name : string
    first_last_name : string
    second_last_name : string
}

export interface IStaffAll {
    name : string
    first_last_name : string
    second_last_name : string
    admin: Admin
    receptionist: Receptionist
}