import {ApiProperty} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {IsAlpha, IsBoolean, IsNotEmpty, MinLength} from "class-validator";
import {PermissionEntity} from "./permission.entity";
import {RoleInterface} from "../interfaces/role.interface";

export class RoleEntity extends AbstractEntity implements RoleInterface{
    @IsNotEmpty()
    @MinLength(3)
    @IsAlpha()
    @ApiProperty({ example: 'ROLE_ADMIN'})
    name: string

    @IsBoolean()
    @ApiProperty({ example: true})
    default: boolean

    permissions: Set<PermissionEntity>
}
