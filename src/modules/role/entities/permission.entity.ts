import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {Exclude} from "class-transformer";
import {IsAlpha, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength} from "class-validator";
import mongoose, {Document} from "mongoose";
import {RoleEntity, RoleProperties} from "./role.entity";
import {IntersectionType} from "@nestjs/mapped-types";

export class PermissionEntityProperties{
    @Prop({
        required: true,
        unique: true,
    })
    @IsNotEmpty()
    @IsAlpha()
    name: string

    @Prop({
        required: true,
        unique: true,
    })
    @IsNotEmpty()
    @IsAlpha()
    description: string

}

export class PermissionEntity extends IntersectionType(
    PermissionEntityProperties,
    AbstractEntity,
) {}