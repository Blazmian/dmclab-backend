export interface IValidateStudent {
    control_number: number
    name: string
    first_last_name: string
    second_last_name: string
    career: number
    semester: number
    fingerprint: string
    pin: number
    active: boolean
}

export interface ILoginStudent {
    control_number: number
    pin: number
}