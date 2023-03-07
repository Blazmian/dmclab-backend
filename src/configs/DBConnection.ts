import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/entities/admin.entity";
import { Career } from "src/entities/career.entity";
import { Enrolled } from "src/entities/enrolled.entity";
import { Equipment } from "src/entities/equipment.entity";
import { LoanDetails } from "src/entities/loan.details.entity";
import { Loan } from "src/entities/loan.entity";
import { Receptionist } from "src/entities/receptionist.entity";
import { Staff } from "src/entities/staff.entity";
import { Student } from "src/entities/student.entity";
import { Subject } from "src/entities/subject.entity";
import { Teacher } from "src/entities/teacher.entity";

export const Connection = TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'dmclab',
    entities: [Admin, Career, Enrolled, Equipment, Loan, LoanDetails, Receptionist, Staff, Student, Subject, Teacher],
    synchronize: true
})