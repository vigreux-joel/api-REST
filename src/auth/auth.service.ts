import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {UserEntity} from "../user/entities/user.entity";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(identifier: string, password: string): Promise<any> {
        let user:UserEntity
        try{
            user = await this.userService.findOne({email: identifier})
        } catch (e){
            return false
        }
        return bcrypt.compare(password, user.password)
    }

    //token content
    async login(payload: any) {
        return {
            access_token: this.jwtService.sign({identifier: payload.identifier}),
        };
    }
}
