import {ApiProperty, ApiPropertyOptional, OmitType} from "@nestjs/swagger";
import {UserEntity} from "../entities/user.entity";
import {UserInterface} from "../interfaces/user.interface";

export class ReadUserDto implements UserInterface{

    @ApiProperty({ example: 'john'})
    firstname: string;

    @ApiProperty({ example: 'snow'})
    lastname: string;

    @ApiProperty({ example: 'example@hotmail.com'})
    email: string;

    avatar: string;

    @ApiPropertyOptional({ example: '+33100000000'})
    tel: string;

    @ApiProperty({ example: 'passwordExample'})
    password: string;
}
