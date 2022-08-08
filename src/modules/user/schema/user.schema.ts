import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {UserEntity} from "../entities/user.entity";
import {UserInterface} from "../interfaces/user.interface";

@Schema({
    toObject: {
        transform: function(doc, ret, options) {
            Object.setPrototypeOf(ret, Object.getPrototypeOf(new UserEntity()));
        }
    },
})
class SchemaProperties implements UserInterface{

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
    avatar: string;

    @Prop({
    })
    tel: string;

    @Prop({
        required: true,
        minLength: 8,
    })
    password: string;
}

export type UserDocument = SchemaProperties & Document;
export const UserSchema = SchemaFactory.createForClass(SchemaProperties);