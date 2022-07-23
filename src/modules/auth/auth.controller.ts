import {Controller, Get, Request, Post, UseGuards, Body} from '@nestjs/common';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {AuthService} from "./auth.service";
import {ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../user/entities/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {LoginAuthDto} from "./dto/login-auth.dto";
import {helper} from "./auth.const";

@ApiTags(helper.name.ucfirst())
@Controller()
export class AuthController {
    constructor(private service: AuthService) {}


    @UseGuards(LocalAuthGuard)
    @ApiOperation({summary: 'Sign in to an account'})
    @Post('login')
    @ApiResponse({ status: 201, description: 'Returns a access token.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    async login(@Request() req, @Body() body: LoginAuthDto) {
        return this.service.login(req.user);
    }
}