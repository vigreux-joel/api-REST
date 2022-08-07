import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {Exclude} from "class-transformer";
import {IsAlpha, IsDefined, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength} from "class-validator";
import mongoose, {Document} from "mongoose";
import {PermissionEntity, PermissionEntityProperties} from "../entities/permission.entity";
import {RoleEntity} from "../entities/role.entity";

@Schema({
    toObject: {
        transform: function(doc, ret, options) {
            Object.setPrototypeOf(ret, Object.getPrototypeOf(new PermissionEntity()));
        }
    },
})
class SchemaProperties implements PermissionEntityProperties{

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
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
    })
    roles: RoleEntity[]
}

export type PermissionDocument = SchemaProperties & Document
export const PermissionSchema = SchemaFactory.createForClass(SchemaProperties)