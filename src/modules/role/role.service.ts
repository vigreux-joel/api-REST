import {Injectable} from '@nestjs/common';
import {RegisterRoles} from "./abstract.permission";
import {RoleRegister} from "./role.register";
import {promises} from "dns";

@Injectable()
export class RoleService {
  constructor(private roleFactory: RoleRegister) {}

  registerRoles(roles: RegisterRoles, lock: boolean = true): void{
    return this.roleFactory.registerRoles(roles, lock)
  }

  async hasRegisterRole(): Promise<boolean>{
    return this.roleFactory.registerFinish
  }
}