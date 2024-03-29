import { TypeOrmModule } from "@nestjs/typeorm";
import { Career } from "src/entities/career.entity";
import { Enrolled } from "src/entities/enrolled.entity";
import { Equipment } from "src/entities/equipment.entity";
import { LoanDetails } from "src/entities/loan.details.entity";
import { Loan } from "src/entities/loan.entity";
import { User } from "src/entities/user.entity";
import { Staff } from "src/entities/staff.entity";
import { Student } from "src/entities/student.entity";
import { Subject } from "src/entities/subject.entity";
import { Teacher } from "src/entities/teacher.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const Connection = TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot()],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Career, Enrolled, Equipment, Loan, LoanDetails, User, Staff, Student, Subject, Teacher],
        synchronize: true
    }),
    inject: [ConfigService]
})