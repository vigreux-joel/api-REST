import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {Exclude} from "class-transformer";
import {IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength} from "class-validator";
import {Document} from "mongoose";

@Schema({
    toObject: {
        transform: function(doc, ret, options) {
            Object.setPrototypeOf(ret, Object.getPrototypeOf(new UserEntity()));
        }
    },
})
export class UserEntity extends AbstractEntity{

    @Prop({
        required: true,
    })
    @IsNotEmpty()
    @MinLength(3)
    @IsAlpha()
    @ApiProperty({ example: 'john'})
    firstname: string;

    @Prop({
        required: true,
    })
    @IsNotEmpty()
    @MinLength(3)
    @IsAlpha()
    @ApiProperty({ example: 'snow'})
    lastname: string;

    @Prop({
        required: true,
        unique: true,
    })
    @IsNotEmpty()
    @MinLength(3)
    @IsEmail()
    @ApiProperty({ example: 'example@hotmail.com'})
    email: string;

    @Prop({
    })
    avatar: string;

    @Prop({
    })
    @IsPhoneNumber()
    @IsOptional()
    @ApiPropertyOptional({ example: '+33100000000'})
    tel: string;

    @Prop({
        required: true,
        minLength: 8,
    })
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({ example: 'passwordExample'})
    @Exclude({ toPlainOnly: true })
    password: string;
}

export type UserDocument = UserEntity & Document;
export const UserSchema = SchemaFactory.createForClass(UserEntity);