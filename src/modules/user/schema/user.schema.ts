import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {UserEntity} from "../entities/user.entity";
import {UserInterface} from "../interfaces/user.interface";
import {RoleEntity} from "../../role/entities/role.entity";
import {RoleHelper} from "../../role/role.helper";
import {AbstractEntity} from "../../../utils/abstract.entity";
import {SchemaTransform} from "../../../utils/schema.transform";
import {LocalFile} from "../../localFile/entities/localFile.entity";

@Schema({
    toObject: {
        transform: SchemaTransform(UserEntity),
    },
})
class SchemaProperties extends AbstractEntity implements UserInterface{

    @Prop({
        required: true,
    })
    firstname: string;

    @Prop({
        required: true,
    })
    lastname: string;

    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
    })
    avatar: LocalFile;

    @Prop({
    })
    tel: string;

    @Prop({
        required: true,
        minLength: 8,
    })
    password: string;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: RoleHelper.modelName }]
    })
    roles: RoleEntity[]
}

export type UserDocument = SchemaProperties & Document;
export const UserSchema = SchemaFactory.createForClass(SchemaProperties);