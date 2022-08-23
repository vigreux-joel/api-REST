import {Injectable, OnApplicationBootstrap, OnModuleInit} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {RoleEntity} from "./entities/role.entity";
import * as bcrypt from "bcrypt";
import {RoleHelper} from "./role.helper";
import {PageOptionsDto} from "../../utils/api/dto/page-option.dto";
import {RoleRepository} from "./repositories/role.repository";
import {PermissionRepository} from "./repositories/permission.repository";
import {PermissionEntity} from "./entities/permission.entity";
import {UserHelper} from "../user/user.helper";
import {InjectModel} from "@nestjs/mongoose";
import {RoleDocument} from "./schema/role.schema";
import {PermissionDocument} from "./schema/permission.schema";
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