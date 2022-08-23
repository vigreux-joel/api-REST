import {Injectable} from '@nestjs/common';
import {RoleEntity} from "./entities/role.entity";
import {PermissionEntity} from "./entities/permission.entity";
import {RoleFactory} from "./role.factory";

@Injectable()
export class RoleService {
  constructor(private roleFactory: RoleFactory) {}

  async registerPermission(name: string, description: string): Promise<PermissionEntity>{
    return this.roleFactory.registerPermission(name, description)
  }

  async registerRole(name: string, permissions: PermissionEntity[], lock:boolean = true): Promise<RoleEntity>{
    return this.roleFactory.registerRole(name, permissions)
  }
}