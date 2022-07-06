import {Controller, Get, Request, Post, UseGuards, Body} from '@nestjs/common';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {AuthService} from "./auth.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {UserEntity} from "../user/entities/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";

type Login = {
    email: string;
    password: string;
};

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Sign in to an account'})
    @Post('login')
    async login(@Request() req: Request) {
        return this.authService.login(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: Request) {
        return req.json();
    }
}