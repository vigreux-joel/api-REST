import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
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
    tel: string;

    @Prop({
        required: true,
        minLength: 8
    })
    password: string;

    @Prop({
        type: Date,
    })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);