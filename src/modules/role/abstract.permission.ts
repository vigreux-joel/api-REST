import {RoleService} from "./role.service";

export abstract class AbstractPermission {

    protected constructor(protected readonly roleService: RoleService) {
        this.createRoles()
    }

    abstract createPermissions(): {category: string, roles: object}

    createRoles(){
        this.roleService.registerRoles(this.createPermissions())
    }
}
