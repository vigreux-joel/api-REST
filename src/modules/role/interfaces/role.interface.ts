import {PermissionEntity} from "../entities/permission.entity";

export class RoleInterface {
    name: string
    category: string
    default: boolean
    permissions: PermissionEntity[]
}