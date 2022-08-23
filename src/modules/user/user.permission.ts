import {Injectable} from "@nestjs/common";
import {UserService} from "./user.service";
import {RoleService} from "../role/role.service";
import {AbstractPermission} from "../role/abstract.permission";
import {EventEmitter2} from "@nestjs/event-emitter";

@Injectable()
export class UserPermission extends AbstractPermission{
    constructor(protected readonly roleService: RoleService, protected eventEmitter: EventEmitter2) {
        super(roleService, eventEmitter);
    }
    async createPermission(){
        const userAdmin = await this.roleService.registerPermission('user.*', 'allows to manage all')
        const userReadAll = await this.roleService.registerPermission('user.read.*', 'allows to read all')
        const userWriteAll = await this.roleService.registerPermission('user.write.*', 'allows to write all')
        const userUpdateAll = await this.roleService.registerPermission('user.update.*', 'allows to update all')
        const userReadFirstName = await this.roleService.registerPermission('user.read.firstname', 'allows to read the firstname')
        const userReadLastName = await this.roleService.registerPermission('user.read.lastname', 'allows to read the lastname')

        await this.roleService.registerRole('default', [userReadFirstName,userReadLastName])
        await this.roleService.registerRole('self', [userWriteAll,userReadAll,userUpdateAll])
        await this.roleService.registerRole('admin', [userAdmin])

        super.createPermission()
    }
}
