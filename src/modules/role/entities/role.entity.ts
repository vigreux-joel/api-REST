import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {IsAlpha, IsNotEmpty, MinLength} from "class-validator";
import {PermissionEntity} from "./permission.entity";
import {Document} from "mongoose";

@Schema({
    toObject: {
        transform: function(doc, ret, options) {
            Object.setPrototypeOf(ret, Object.getPrototypeOf(new RoleEntity()));
        }
    },
})
export class RoleEntity extends AbstractEntity{

    @Prop({
        required: true,
    })
    @IsNotEmpty()
    @MinLength(3)
    @IsAlpha()
    @ApiProperty({ example: 'ROLE_ADMIN'})
    name: string


    permissions: PermissionEntity[]
}

export type RoleDocument = RoleEntity & Document;
export const RoleSchema = SchemaFactory.createForClass(RoleEntity);