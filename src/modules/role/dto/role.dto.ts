import {IsAlpha, IsBoolean, IsNotEmpty, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {PermissionEntity} from "../entities/permission.entity";
import {RoleProperties} from "../entities/role.entity";

export class RoleDto implements RoleProperties{

    @ApiProperty({ example: 'ROLE_ADMIN'})
    name: string


    @ApiProperty({ example: true})
    default: boolean

    permissions: PermissionEntity[]
}