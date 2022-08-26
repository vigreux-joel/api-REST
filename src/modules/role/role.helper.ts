import {RoleEntity} from "./entities/role.entity";

export class RoleHelper {

    static moduleName: string = 'role'

    static entityName: string = this.moduleName

    static modelName: string = this.moduleName.ucfirst()

    static defaultRoleName: string = 'default'
    static defaultRole: RoleEntity
}