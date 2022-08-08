import {PermissionEntity} from "../entities/permission.entity";

export class RoleInterface {
    name: string
    default: boolean
    permissions: PermissionEntity[]
}