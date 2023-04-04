import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { IReceptionist } from 'src/models/Receptionist';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor (private userService : UserService) {}

    @Post(':idStaff')
    Create(@Param('idStaff') idStaff: number, @Body() params : IReceptionist) {
        try {
            const res = this.userService.create(idStaff, params)
            return res
        } catch (error) {
            return "Cannot create user: " + error
        }
    }

    @Get('all')
    getUsers() : Promise<User[]> | string {
        try {
            const res = this.userService.getAll()
            return res
        } catch (error) {
            return "Cannot read user: " + error
        }
    }

    @Get('one/:username')
    getUser(@Param('username') params) : Promise<User> | string {
        try {
            const res = this.userService.get(params)
            return res
        } catch (error) {
            return "Cannot read user: " + error
        }
    }

    @Put('update/:username')
    updateUser(@Param('username') username : string, @Body() params : IReceptionist) {
        try {
            const res = this.userService.update(username, params)
            return res
        } catch (error) {
            return "Cannot update user: " + error            
        }
    }

    @Put('fingerprint/:username')
    submitFingerprintUser(@Param('username') username : string, @Body() params : string) {
        try {
            const res = this.userService.submitFingerprint(username, params)
            return res
        } catch (error) {
            return "Cannot submit user fingerprint: " + error            
        }
    }

    @Delete('delete/:idStaff')
    deleteUser(@Param('idStaff') idStaff, @Body() params: string) {
        try {
            const res = this.userService.delete(idStaff, params)
            return res
        } catch (error) {
            return "Cannot delete user: " + error
        }
    }
}