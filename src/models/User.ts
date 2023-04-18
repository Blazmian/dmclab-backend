import { Staff } from "src/entities/staff.entity"

export interface IUser {
    username: string
    password: string
    staff: Staff
}

export interface IUserPermission {
    canDelete: boolean
    canUpdate: boolean
}

export interface IUserLogin {
    username : string
    password : string
}