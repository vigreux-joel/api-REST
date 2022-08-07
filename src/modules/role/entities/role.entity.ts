import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {IsAlpha, IsBoolean, IsNotEmpty, MinLength} from "class-validator";
import {PermissionEntity} from "./permission.entity";
import mongoose, {Document} from "mongoose";
import {IntersectionType} from "@nestjs/mapped-types";

export class RoleEntityProperties{

    @Prop({
        required: true,
    })
    @IsNotEmpty()
    @MinLength(3)
    @IsAlpha()
    @ApiProperty({ example: 'ROLE_ADMIN'})
    name: string

    @Prop({
        required: true,
    })
    @IsBoolean()
    @ApiProperty({ example: true})
    default: boolean

    @Prop({
        required: true,
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
    })
    permissions: PermissionEntity[]
}

export class RoleEntity extends IntersectionType(
    RoleEntityProperties,
    AbstractEntity,
) {}
