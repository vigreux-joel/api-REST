import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {IsAlpha, IsBoolean, IsNotEmpty, MinLength} from "class-validator";
import {PermissionEntity, PermissionInterface} from "./permission.entity";
import mongoose, {Document} from "mongoose";
import {IntersectionType} from "@nestjs/mapped-types";

export class RoleInterface {
    name: string
    default: boolean
    permissions: PermissionEntity[]
}

export class RoleEntity extends AbstractEntity implements RoleInterface{
    @IsNotEmpty()
    @MinLength(3)
    @IsAlpha()
    @ApiProperty({ example: 'ROLE_ADMIN'})
    name: string

    @IsBoolean()
    @ApiProperty({ example: true})
    default: boolean

    permissions: PermissionEntity[]
}
