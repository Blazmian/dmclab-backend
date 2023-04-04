import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Staff } from 'src/entities/staff.entity';
import { IStaff } from 'src/models/Staff';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
    constructor(private staffService: StaffService) { }

    @Post()
    Create(@Body() params: IStaff) {
        try {
            const res = this.staffService.create(params)
            console.log("Staff created")
            return true
        } catch (error) {
            return "Cannot create personal: " + error
        }
    }

    @Get('all')
    getStaff(): Promise<Staff[]> | string {
        try {
            const res = this.staffService.getAll()
            return res
        } catch (error) {
            return "Cannot read staff: " + error
        }
    }

    @Get('one/:id')
    getPersonal(@Param('id') params): Promise<Staff> | string {
        try {
            const res = this.staffService.get(params)
            return res
        } catch (error) {
            return "Cannot read staff: " + error
        }
    }

    @Put('update/:id')
    updatePersonal(@Param('id') id: number, @Body() params: IStaff) {
        try {
            const res = this.staffService.update(id, params)
            return res
        } catch (error) {
            return "Cannot update personal: " + error
        }
    }

    @Delete('delete/:id')
    deletePersonal(@Param('id') params) {
        try {
            const res = this.staffService.delete(params)
            return res
        } catch (error) {
            return "Cannot delete personal: " + error
        }
    }
}