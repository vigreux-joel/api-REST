import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {Exclude} from "class-transformer";
import {IsAlpha, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength} from "class-validator";
import mongoose, {Document} from "mongoose";
import {PermissionEntity} from "../entities/permission.entity";
import {RoleEntity} from "../entities/role.entity";
import {PermissionInterface} from "../interfaces/permission.interface";

@Schema({
    toObject: {
        transform: function(doc, ret, options) {
            Object.setPrototypeOf(ret, Object.getPrototypeOf(new PermissionEntity()));
        }
    },
})
class SchemaProperties extends AbstractEntity implements PermissionInterface{

    @Prop({
        required: true,
        unique: true,
    })
    name: string

    @Prop({
        required: true,
        unique: true,
    })
    description: string

    @Prop({
        required: true,
    })
    category: string;
}

export type PermissionDocument = SchemaProperties & Document
export const PermissionSchema = SchemaFactory.createForClass(SchemaProperties)