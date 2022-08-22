import {ReadUserDto} from "./read-user.dto";
import {ApiProperty, IntersectionType, OmitType} from "@nestjs/swagger";
import {UserEntity} from "../entities/user.entity";

export class CreateUserDto extends OmitType(IntersectionType(ReadUserDto, UserEntity), ['id', 'createdAt']) {

    @ApiProperty({ example: 'passwordExample'})
    password: string

}

