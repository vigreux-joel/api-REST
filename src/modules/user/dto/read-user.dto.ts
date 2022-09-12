import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {UserInterface} from "../interfaces/user.interface";
import {RoleEntity} from "../../role/entities/role.entity";
import {AbstractEntity} from "../../../utils/abstract.entity";

export class ReadUserDto extends AbstractEntity implements UserInterface{

    @ApiProperty({ example: 'John'})
    firstname: string;

    @ApiProperty({ example: 'Doe'})
    lastname: string;

    @ApiProperty({ example: 'example@hotmail.com'})
    email: string;

    avatar: string;

    @ApiPropertyOptional({ example: '+33100000000'})
    tel: string;

    password: string;

    @ApiProperty({ example: ['default']})
    roles: RoleEntity[]
}
