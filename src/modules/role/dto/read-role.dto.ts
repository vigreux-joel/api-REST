import {IsAlpha, IsBoolean, IsNotEmpty, MinLength} from "class-validator";
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {PermissionEntity} from "../entities/permission.entity";
import {UserEntity} from "../../user/entities/user.entity";
import {RoleInterface} from "../interfaces/role.interface";

export class ReadRoleDto implements RoleInterface{

    @ApiProperty({ example: 'ROLE_ADMIN'})
    name: string

    @ApiProperty({ example: true})
    default: boolean

    permissions: Set<PermissionEntity>
}