import {Injectable} from '@nestjs/common';
import {RoleEntity} from "./entities/role.entity";
import {RoleRepository} from "./repositories/role.repository";
import {PermissionRepository} from "./repositories/permission.repository";
import {PermissionEntity} from "./entities/permission.entity";
import {InjectModel} from "@nestjs/mongoose";
import {RoleHelper} from "./role.helper";


@Injectable()
export class RoleFactory {

    private categories: Set<string> = new Set()
    private categoriesRegistered: number = 0

    private rolesDefault: Set<string> = new Set()
    private permissions: Set<string> = new Set()

    constructor(@InjectModel('Role') private roleRepository: RoleRepository, private readonly permissionRepository: PermissionRepository) {
    }

    async registerRoles(values: {category: string, roles: object}, lock: boolean = true): Promise<void>{
        if(this.categories.has(values.category)){
            new Error('Permission category already created')
        }
        this.categories.add(values.category)
        for (const role of Object.keys(values.roles)) {

            let permissions: Set<PermissionEntity> = new Set()

            for (const permission of values.roles[role]) {
                permissions.add(await this.registerPermission(values.category, permission.name, permission.description))
            }

            await this.registerRole(role, permissions)
            // this.registerPermission(values.category, )
        }
        this.categoriesRegistered++
        if(this.categories.size == this.categoriesRegistered){
            this.deleteUnused()
        }
    }

    async registerRole(name: string, permissions: Set<PermissionEntity>, lock:boolean = true): Promise<RoleEntity>{
        let role: RoleEntity = await this.roleRepository.findOne({name: name})
        if (role){
            if(this.permissions.has(role.name)) {
                return role
            }
            role.permissions = Array.from(permissions)
            role = await this.roleRepository.findOneAndUpdate({name: name}, role)
        }
        else {
            role = new RoleEntity()
            role.name = name
            role.permissions = Array.from(permissions)
            role.default = lock
            role.createdAt = new Date()
            role = await this.roleRepository.create(role)
        }
        this.rolesDefault.add(role.name)
        return role;
    }

    async registerPermission(category: string, name: string, description: string): Promise<PermissionEntity>{
        let permission: PermissionEntity = await this.permissionRepository.findOne({name: category+'.'+name})

         if (permission) {
            if(this.permissions.has(permission.name)){
                return permission
            }
            permission.category = category
            permission.description = description
            permission = await this.permissionRepository.findOneAndUpdate(permission.id, permission)
        } else {
            permission = new PermissionEntity()
            permission.name = category+'.'+name
            permission.category = category
            permission.description = description
            permission = await this.permissionRepository.create(permission);
        }
        this.permissions.add(permission.name)
        return permission;
    }

    private async deleteUnused() {
        await this.deleteUnusedRole()
        await this.deleteUnusedPermission()

        RoleHelper.defaultRole = await this.roleRepository.findOne({name: RoleHelper.defaultRoleName})
    }

    private async deleteUnusedRole() {
        const legacyRoleDefault = await this.roleRepository.find({default: true})
        for (const role of legacyRoleDefault) {
            if(!this.rolesDefault.has(role.name)){
                await this.roleRepository.findOneAndRemove({name: role.name})
            }
        }
    }

    private async deleteUnusedPermission() {
        const legacyPermissionDefault = await this.permissionRepository.find()
        for (const permission of legacyPermissionDefault) {
            if(!this.permissions.has(permission.name)){
               await this.permissionRepository.findOneAndRemove({name: permission.name})
            }
        }
    }
}