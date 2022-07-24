import {Controller, Request, Post, UseGuards, Body} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {LoginAuthDto} from "./dto/login-auth.dto";
import {AuthHelper} from "./auth.helper";

@ApiTags(AuthHelper.moduleName.ucfirst())
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