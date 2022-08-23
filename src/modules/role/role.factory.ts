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

@Injectable()
export class RoleFactory {

    private rolesDefault: string[] = []
    private permissions: string[] = []
    constructor(@InjectModel('Role') private roleRepository: RoleRepository, private readonly permissionRepository: PermissionRepository) {}

    onAllRoleRegister(): any {
        this.deleteUnusedRole()
        this.deleteUnusedPermission()
    }

    private async deleteUnusedRole() {
        const legacyRoleDefault = await this.roleRepository.find({default: true})
        for (let i = 0; i < legacyRoleDefault.length; i++){
            if (!this.rolesDefault.includes(legacyRoleDefault[i].name)){
                this.rolesDefault.splice(i, 1)
                await this.roleRepository.findOneAndRemove({name: legacyRoleDefault[i].name})
            }
        }
    }

    private async deleteUnusedPermission() {
        const legacyPermission = await this.permissionRepository.find()
        for (let i = 0; i < legacyPermission.length; i++){
            if (!this.permissions.includes(legacyPermission[i].name)){
                this.permissions.splice(i, 1)
                await this.permissionRepository.findOneAndRemove({name: legacyPermission[i].name})
            }
        }
    }

    async registerPermission(name: string, description: string): Promise<PermissionEntity>{
        let permission: PermissionEntity = await this.permissionRepository.findOne({name: name})
        if (permission) {
            permission.description = description
            permission = await this.permissionRepository.findOneAndUpdate(permission.id, permission)
        } else {
            permission = new PermissionEntity()
            permission.name = name
            permission.description = description
            permission = await this.permissionRepository.create(permission);
        }
        this.permissions.push(permission.name)
        return permission;
    }

    async registerRole(name: string, permissions: PermissionEntity[], lock:boolean = true): Promise<RoleEntity>{
        let role: RoleEntity = await this.roleRepository.findOne({name: name})
        if (role){
            role.permissions = permissions
            role = await this.roleRepository.findOneAndUpdate(role.id, role)
        }
        else {
            role = new RoleEntity()
            role.name = name
            role.permissions = permissions
            role.default = lock
            role = await this.roleRepository.create(role);
        }
        this.rolesDefault.push(role.name)
        return role;
    }
}