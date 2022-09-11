import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {AbstractEntity} from "../../../utils/abstract.entity";
import mongoose, {Document} from "mongoose";
import {PermissionEntity} from "../entities/permission.entity";
import {RoleEntity} from "../entities/role.entity";
import {RoleInterface} from "../interfaces/role.interface";
import {SchemaTransform} from "../../../utils/schema.transform";

@Schema({
    toObject: {
        transform: SchemaTransform(RoleEntity),
    },
})
class SchemaProperties extends AbstractEntity implements RoleInterface{
    @Prop({
        required: true,
        unique: true
    })
    name: string;

    @Prop({
        required: true,
    })
    category: string;

    @Prop({
        required: true,
    })
    default: boolean;

    @Prop({
        required: true,
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
    })
    permissions: PermissionEntity[]
}

export type RoleDocument = SchemaProperties & Document
export const RoleSchema = SchemaFactory.createForClass(SchemaProperties);
