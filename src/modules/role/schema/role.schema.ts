import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {IsAlpha, IsBoolean, IsNotEmpty, MinLength} from "class-validator";
import mongoose, {Document} from "mongoose";
import {PermissionEntity} from "../entities/permission.entity";
import {RoleEntity} from "../entities/role.entity";
import {RoleInterface} from "../interfaces/role.interface";

@Schema({
    toObject: {
        transform: function(doc, ret, options) {
            Object.setPrototypeOf(ret, Object.getPrototypeOf(new RoleEntity()));
        }
    },
})
class SchemaProperties implements RoleInterface{
    @Prop({
        required: true,
    })
    name: string

    @Prop({
        required: true,
    })
    default: boolean

    @Prop({
        required: true,
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
    })
    permissions: PermissionEntity[]
}

export type RoleDocument = SchemaProperties & Document
export const RoleSchema = SchemaFactory.createForClass(SchemaProperties);
