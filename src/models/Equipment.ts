export interface IEquipment {
    equipment_name: string,
    equipment_number: number,
    brand: string,
    model: string,
    serial_number: string,
    projector: boolean,
    extension: boolean,
    hdmi: boolean,
    damaged: boolean,
    photo: Buffer
}