import {Prop, Schema} from "@nestjs/mongoose";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {AbstractEntity} from "../../database/AbstractEntity";
import {Exclude} from "class-transformer";

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
    @ApiProperty({ example: 'john'})
    firstname: string;

    @Prop({
        required: true,
    })
    @ApiProperty({ example: 'snow'})
    lastname: string;

    @Prop({
        required: true,
        unique: true,
    })
    @ApiProperty({ example: '+33100000000'})
    email: string;

    @Prop({
    })
    avatar: string;

    @Prop({
    })
    @ApiPropertyOptional({ example: '+33100000000'})
    tel: string;

    @Prop({
        required: true,
        minLength: 8,
    })
    @ApiProperty({ example: 'passwordExample'})
    @Exclude({ toPlainOnly: true })
    password: string;
}

