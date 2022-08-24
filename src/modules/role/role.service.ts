import {Injectable} from '@nestjs/common';
import {RoleEntity} from "./entities/role.entity";
import {PermissionEntity} from "./entities/permission.entity";
import {RoleFactory} from "./role.factory";

@Injectable()
export class RoleService {
  constructor(private roleFactory: RoleFactory) {}

  registerRoles(roles: {category: string, roles: object}, lock: boolean = true): Promise<void>{
    return this.roleFactory.registerRoles(roles, lock)
  }
}