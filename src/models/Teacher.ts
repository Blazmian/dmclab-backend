export interface IValidateTeacher {
    control_number: number
    name: string
    first_last_name: string
    second_last_name: string
    rfc: string
    fingerprint: string
    pin: number
}

export interface ILoginTeacher {
    control_number: number
    pin: number
}