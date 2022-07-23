import {IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, Length, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../user/entities/user.entity";

export class LoginAuthDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'example@hotmail.com'})
    identifier: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'passwordExample'})
    password: string;

    user: User;
}
