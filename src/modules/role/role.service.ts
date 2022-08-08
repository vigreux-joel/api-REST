import {Injectable} from '@nestjs/common';
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

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleRepository, private readonly permissionRepository: PermissionRepository) {
    // permissionRepository.resetDefaultPermission()
    this.resetDefaultRole()
  }

  async resetDefaultRole() {
    const roles = await this.roleRepository.find({default: true})
    roles.forEach((role) => {
      this.permissionRepository.deleteMany(
          {
            id: {
              $in: role.permission
            }
          }
      )
    });
    return await this.roleRepository.deleteMany({default: true})
  }

  async registerDefaultPermission(name: string, description: string): Promise<PermissionEntity>{
    let permission = new PermissionEntity()
    permission.name = RoleHelper.prefixDefaultPermission+'.'+name
    permission.description = description;
    return this.permissionRepository.create(permission)
  }

  async registerPermission(name: string, description: string): Promise<PermissionEntity>{
    let permission = new PermissionEntity()
    permission.name = name
    permission.description = description
    return this.permissionRepository.create(permission)
  }

  async registerRole(name: string, permissions: PermissionEntity[], lock:boolean = true): Promise<PermissionEntity>{
    let role = new RoleEntity()
    role.name = name
    role.permissions = permissions
    role.default = true
    return  this.roleRepository.create(role);
  }

  // async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
  //   return this.roleRepository.create(createRoleDto);
  // }
  //
  // async findAll(pageOptionsDto: PageOptionsDto) {
  //   return this.roleRepository.find(null, pageOptionsDto);
  // }
  //
  // async findOne(filter: string|object): Promise<RoleEntity> {
  //   let result: RoleEntity
  //   result = await this.roleRepository.findOne(filter);
  //   if (!result){
  //     throw new Error('not found '+RoleHelper.entityName);
  //   }
  //   return result
  // }
  //
  // async update(filter: string|object, updateRoleDto: UpdateRoleDto): Promise<null|RoleEntity> {
  //   let result
  //   result = await this.roleRepository.findOneAndUpdate(filter, updateRoleDto);
  //   if (!result) {
  //     throw new Error('not found '+RoleHelper.entityName)
  //   }
  //   return result
  // }
  //
  // async remove(filter: string|object): Promise<null|RoleEntity> {
  //   let result
  //   try {
  //     result = await this.roleRepository.findOneAndRemove(filter);
  //   } catch (e) {
  //     throw new Error('not found '+RoleHelper.entityName)
  //   }
  //   return result
  // }
  //
  // async hashPassword(password, saltRounds = 10): Promise<string> {
  //   const salt = await bcrypt.genSalt(saltRounds);
  //   return await bcrypt.hash(password, salt);
  // }
}