export interface ICreateLoan {
    hours: number,
    class: string,
    members: number,
    student: number,
    teacher: number,
    subject: number,
    equipments: [{ name: string, quantity: number }],
}