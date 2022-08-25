import {Injectable} from "@nestjs/common";
import {RoleService} from "../role/role.service";
import {AbstractPermission} from "../role/abstract.permission";
import {UserHelper} from "./user.helper";

@Injectable()
export class UserPermission extends AbstractPermission{
    constructor(protected readonly roleService: RoleService) {
        super(roleService);
    }
    createPermissions(){
        return {
            category: UserHelper.entityName,
            roles: {
                default: [
                    {name:'read.firstname', description: 'allows to read the firstname'},
                    {name:'read.lastname', description: 'allows to read the lastname'},
                ],
                self: [
                    {name:'read.*', description: 'allows to read all'},
                    {name:'write.*', description: 'allows to write all'},
                    {name:'update.*', description: 'allows to update all'},
                ],
                admin: [
                    {name:'*', description: 'allows to manage all'},
                ],
            }
        }
    }
}
