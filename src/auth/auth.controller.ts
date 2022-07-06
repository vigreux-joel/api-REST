import {Controller, Get, Request, Post, UseGuards, Body} from '@nestjs/common';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {AuthService} from "./auth.service";
import {ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "../user/entities/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {LoginAuthDto} from "./dto/login-auth.dto";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}


    @UseGuards(LocalAuthGuard)
    @ApiOperation({summary: 'Sign in to an account'})
    @Post('login')
    @ApiTags('Auth')
    @ApiResponse({ status: 201, description: 'Returns a access token.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    async login(@Request() req, @Body() body: LoginAuthDto) {
        return this.authService.login(req.user);
    }

    // @UseGuards(JwtAuthGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //     return req.user;
    // }
}