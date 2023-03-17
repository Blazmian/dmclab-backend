import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { IAdmin } from 'src/models/Admin';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor (private adminService : AdminService) {}

    @Post()
    Create(@Body() params : IAdmin) {
        try {
            const res = this.adminService.create(params)
            console.log("Admin created")
            return true
        } catch (error) {
            return "Cannot create admin: " + error
        }
    }

    @Get('all')
    getAdmins() : Promise<Admin[]> | string {
        try {
            const res = this.adminService.getAll()
            return res
        } catch (error) {
            return "Cannot read admins: " + error
        }
    }

    @Get('one/:username')
    getAdmin(@Param('username') params) : Promise<Admin> | string {
        try {
            const res = this.adminService.get(params)
            return res
        } catch (error) {
            return "Cannot read admins: " + error
        }
    }

    @Put('update/:username')
    updatePersonal(@Param('username') username : string, @Body() params : IAdmin) {
        try {
            const res = this.adminService.update(username, params)
            return res
        } catch (error) {
            return "Cannot update personal: " + error            
        }
    }

    @Delete('delete/:username')
    deleteAdmin(@Param('username') params) {
        try {
            const res = this.adminService.delete(params)
            return res
        } catch (error) {
            return "Cannot delete admin: " + error
        }
    }
}