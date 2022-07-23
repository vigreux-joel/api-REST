import {IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, Length, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    @IsEmail()
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
    @ApiProperty({ example: 'john'})
    firstname: string;

    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    @IsAlpha()
    @ApiProperty({ example: 'snow'})
    lastname: string;

    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({ example: 'passwordExample'})
    password: string;

    createdAt: Date;
}
