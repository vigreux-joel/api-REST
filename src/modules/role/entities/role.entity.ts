import {ApiProperty} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/abstract.entity";
import {IsAlpha, IsBoolean, IsNotEmpty, MinLength} from "class-validator";
import {PermissionEntity} from "./permission.entity";
import {RoleInterface} from "../interfaces/role.interface";
import {Exclude} from "class-transformer";

export class RoleEntity extends AbstractEntity implements RoleInterface{
    @IsNotEmpty()
    @MinLength(3)
    @IsAlpha()
    @ApiProperty({ example: 'ROLE_ADMIN'})
    name: string

    @IsBoolean()
    @ApiProperty({ example: true})
    default: boolean

    permissions: PermissionEntity[]
}
