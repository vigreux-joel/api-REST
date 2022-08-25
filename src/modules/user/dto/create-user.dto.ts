import {ReadUserDto} from "./read-user.dto";
import {ApiProperty, ApiPropertyOptional, IntersectionType, OmitType} from "@nestjs/swagger";
import {UserEntity} from "../entities/user.entity";
import {RoleEntity} from "../../role/entities/role.entity";
import {Transform} from "class-transformer";
import * as mongoose from "mongoose";

export class CreateUserDto extends OmitType(IntersectionType(ReadUserDto, UserEntity), ['id', 'createdAt', '_id']) {

    @ApiProperty({ example: 'passwordExample'})
    password: string

    @Transform(({ value }) => value.map(id => {
        try{
            return new mongoose.Types.ObjectId(id)
        } catch (e){
            return null
        }
    }),{toClassOnly: true})
    @ApiPropertyOptional({ example: ['72dfe827795fddb48be5e3eb']})
    roles: RoleEntity[]

}

