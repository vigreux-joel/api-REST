import {Injectable} from '@nestjs/common';
import {RoleFactory} from "./role.factory";

@Injectable()
export class RoleService {
  constructor(private roleFactory: RoleFactory) {}

  registerRoles(roles: {category: string, roles: object}, lock: boolean = true): Promise<void>{
    return this.roleFactory.registerRoles(roles, lock)
  }
}