import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {Exclude} from "class-transformer";
import {IsAlpha, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength} from "class-validator";
import {Document} from "mongoose";
import {RoleEntity} from "./role.entity";

@Schema({
    toObject: {
        transform: function(doc, ret, options) {
            Object.setPrototypeOf(ret, Object.getPrototypeOf(new PermissionEntity()));
        }
    },
})
export class PermissionEntity extends AbstractEntity{

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

export type PermissionDocument = PermissionEntity & Document;
export const PermissionSchema = SchemaFactory.createForClass(PermissionEntity);