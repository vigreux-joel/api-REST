import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {Exclude} from "class-transformer";
import {IsAlpha, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength} from "class-validator";
import mongoose, {Document} from "mongoose";
import {IntersectionType} from "@nestjs/mapped-types";

export interface PermissionInterface{
    name: string
    description: string
}

export class PermissionEntity extends AbstractEntity implements PermissionInterface{
    @IsNotEmpty()
    @IsAlpha()
    name: string

    @IsNotEmpty()
    @IsAlpha()
    description: string
}
