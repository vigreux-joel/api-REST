import {Prop, Schema} from "@nestjs/mongoose";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {AbstractEntity} from "../../database/AbstractEntity";

@Schema()
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
        minLength: 8
    })
    @ApiProperty({ example: 'passwordExample'})
    password: string;
}