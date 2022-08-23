import {RoleService} from "./role.service";
import {EventEmitter2} from "@nestjs/event-emitter";

export abstract class AbstractPermission {

    protected constructor(protected readonly roleService: RoleService, protected eventEmitter: EventEmitter2) {
        this.eventEmitter.emit('role.register')
        this.createPermission()
    }

    createPermission(){
        this.eventEmitter.emit('role.registered')
    }
}
