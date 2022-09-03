import {ApiProperty, ApiPropertyOptional, OmitType} from "@nestjs/swagger";
import {UserEntity} from "../entities/user.entity";
import {UserInterface} from "../interfaces/user.interface";
import {RoleEntity} from "../../role/entities/role.entity";
import {Exclude} from "class-transformer";
import {ClassSerializerInterceptor, UseInterceptors} from "@nestjs/common";
import {TransformInterceptor} from "../../../utils/api/transform.interceptor";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {list} from "adminjs/types/src/frontend/components/property-type/array";
import {LocalFile} from "../../localFile/entities/localFile.entity";

export class ReadUserDto extends AbstractEntity implements UserInterface{

    @ApiProperty({ example: 'john'})
    firstname: string;

    @ApiProperty({ example: 'snow'})
    lastname: string;

    @ApiProperty({ example: 'example@hotmail.com'})
    email: string;

    @ApiPropertyOptional({type: "file"})
    avatar: LocalFile;

    @ApiPropertyOptional({ example: '+33100000000'})
    tel: string;

    password: string;

    @ApiProperty({ type: [RoleEntity]})
    roles: RoleEntity[]
}
