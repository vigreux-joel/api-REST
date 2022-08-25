import {ApiProperty} from "@nestjs/swagger";
import {PermissionEntity} from "../entities/permission.entity";
import {RoleInterface} from "../interfaces/role.interface";

export class ReadRoleDto implements RoleInterface{

    @ApiProperty({ example: 'ROLE_ADMIN'})
    name: string

    @ApiProperty({ example: true})
    default: boolean

    permissions: PermissionEntity[]

}