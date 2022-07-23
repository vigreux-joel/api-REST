import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../user/entities/user.entity";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(identifier: string, password: string): Promise<boolean|User> {
        let user:User
        try{
            user = await this.userService.findOne({email: identifier})
        } catch (e){
            return false
        }
        if(await bcrypt.compare(password, user.password)){
            return user
        }
    }

    //token content
    async login(user) {
        return {
            access_token: this.jwtService.sign({id: user._id}),
        };
    }
}
