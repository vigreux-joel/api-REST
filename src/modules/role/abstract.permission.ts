import {RoleService} from "./role.service";

export type RegisterRoles = {
    name: string,
    category: string,
    permissions: { name: string; description: string }[],
}[]

export abstract class AbstractPermission {

    protected constructor(protected readonly roleService: RoleService) {
        this.createRoles()
    }

    abstract createPermissions(): RegisterRoles

    createRoles(){
        this.roleService.registerRoles(this.createPermissions())
    }
}