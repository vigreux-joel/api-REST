import {Injectable} from "@nestjs/common";
import {RoleService} from "../role/role.service";
import {AbstractPermission} from "../role/abstract.permission";
import {UserHelper} from "./user.helper";
import {RoleEntity} from "../role/entities/role.entity";

@Injectable()
export class UserPermission extends AbstractPermission{
    constructor(protected readonly roleService: RoleService) {
        super(roleService);
    }
    createPermissions() {
        return [
            {
                name: "default",
                category: UserHelper.entityName,
                permissions: [
                    {name: 'read.firstname', description: 'allows to read the firstname'},
                    {name:'read.lastname', description: 'allows to read the lastname'},
                ]
            },
            {
                name: "self",
                category: UserHelper.entityName,
                permissions: [
                    {name:'read.*', description: 'allows to read all'},
                    {name:'write.*', description: 'allows to write all'},
                    {name:'update.*', description: 'allows to update all'},
                ]
            },
            {
                name: "admin",
                category: UserHelper.entityName,
                permissions: [
                    {name:'*', description: 'allows to manage all'},
                ],
            },
        ]
    }
}