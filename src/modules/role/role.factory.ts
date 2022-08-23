import {Injectable} from '@nestjs/common';
import {RoleEntity} from "./entities/role.entity";
import {RoleRepository} from "./repositories/role.repository";
import {PermissionRepository} from "./repositories/permission.repository";
import {PermissionEntity} from "./entities/permission.entity";
import {InjectModel} from "@nestjs/mongoose";
import {OnEvent} from "@nestjs/event-emitter";


@Injectable()
export class RoleFactory {

    private rolesDefault: string[] = []
    private permissions: string[] = []
    constructor(@InjectModel('Role') private roleRepository: RoleRepository, private readonly permissionRepository: PermissionRepository) {}

    @OnEvent('role.registered')
    onRoleRegistered(): any {
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
            role = await this.roleRepository.findOneAndUpdate({name: name}, role)
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