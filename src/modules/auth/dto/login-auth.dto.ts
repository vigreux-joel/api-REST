import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginAuthDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'example@hotmail.com'})
    identifier: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'passwordExample'})
    password: string;
}
