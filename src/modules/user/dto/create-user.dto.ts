import {ReadUserDto} from "./read-user.dto";
import {ApiProperty, ApiPropertyOptional, IntersectionType, OmitType} from "@nestjs/swagger";
import {UserEntity} from "../entities/user.entity";
import {RoleEntity} from "../../role/entities/role.entity";
import {Transform} from "class-transformer";
import * as mongoose from "mongoose";
import {getAbstractEntityProperties} from "../../../utils/abstract.entity";
import { type } from "os";
import {IsArray} from "class-validator";

export class CreateUserDto extends OmitType(IntersectionType(ReadUserDto, UserEntity), [...getAbstractEntityProperties()]) {

    @ApiProperty({ example: 'passwordExample'})
    password: string

    @Transform(({ value }) => value.map(id => {
        try{
            return new mongoose.Types.ObjectId(id)
        } catch (e){
            return null
        }
    }),{toClassOnly: true})
    @ApiProperty({ example: ['72dfe827795fddb48be5e3eb']})
    roles: RoleEntity[]
}

