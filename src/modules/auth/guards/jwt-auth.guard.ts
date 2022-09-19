import {Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {UserEntity} from "../../user/entities/user.entity";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}


@Injectable()
export class JwtAuthGuardOptional extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        if(!user){
            user = new UserEntity()
        }
        if (err) {
            throw err
        }
        return user;
    }
}
