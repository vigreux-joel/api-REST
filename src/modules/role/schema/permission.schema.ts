import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {AbstractEntity} from "../../../utils/abstract.entity";
import {Document} from "mongoose";
import {PermissionEntity} from "../entities/permission.entity";
import {PermissionInterface} from "../interfaces/permission.interface";
import {SchemaTransform} from "../../../utils/schema.transform";

@Schema({
    toObject: {
        transform: SchemaTransform(PermissionEntity),
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
    })
    description: string
}

export type PermissionDocument = SchemaProperties & Document
export const PermissionSchema = SchemaFactory.createForClass(SchemaProperties)