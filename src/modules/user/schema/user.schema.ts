import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {UserEntity} from "../entities/user.entity";

export type UserDocument = UserEntity & Document;

export const UserSchema = SchemaFactory.createForClass(UserEntity);