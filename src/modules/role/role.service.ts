import {Injectable} from '@nestjs/common';
import {RegisterRoles} from "./abstract.permission";
import {RoleRegister} from "./role.register";

@Injectable()
export class RoleService {
  constructor(private roleFactory: RoleRegister) {}

  registerRoles(roles: RegisterRoles, lock: boolean = true): void{
    return this.roleFactory.registerRoles(roles, lock)
  }
}