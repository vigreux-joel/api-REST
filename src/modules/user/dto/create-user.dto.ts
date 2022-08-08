import {ReadUserDto} from "./read-user.dto";
import {IntersectionType, OmitType} from "@nestjs/swagger";
import {UserEntity} from "../entities/user.entity";

export class CreateUserDto extends IntersectionType(ReadUserDto, OmitType(UserEntity, ['id', 'createdAt'])) {}

