import {RoleService} from "./role.service";
import {EventEmitter2} from "@nestjs/event-emitter";

export abstract class AbstractPermission {

    protected constructor(protected readonly roleService: RoleService) {
        this.createRoles()
    }

    abstract createPermissions(): {category: string, roles: object}

    createRoles(){
        this.roleService.registerRoles(this.createPermissions())
    }
}
