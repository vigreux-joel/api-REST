import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {UserEntity} from "../user/entities/user.entity";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user:UserEntity = await this.userService.findOne({email: email})

        return bcrypt.compare(password, user.password)
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
