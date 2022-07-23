import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @MinLength(3)
    @IsEmail()
    @IsOptional()
    @ApiProperty({ example: 'example@hotmail.com'})
    email: string;

    @IsPhoneNumber()
    @IsOptional()
    @ApiProperty({ example: '+33100000000'})
    tel: string;

    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    @IsAlpha()
    @IsOptional()
    @ApiProperty({ example: 'john'})
    firstname: string;

    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    @IsAlpha()
    @IsOptional()
    @ApiProperty({ example: 'snow'})
    lastname: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsOptional()
    @ApiProperty({ example: '123456789'})
    password: string;
}
