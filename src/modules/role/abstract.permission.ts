import {RoleService} from "./role.service";

export abstract class AbstractPermission {

    protected constructor(protected readonly roleService: RoleService) {
        this.createPermission()
    }

    abstract createPermission()
}
