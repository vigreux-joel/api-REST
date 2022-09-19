import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {RoleEntity} from "./entities/role.entity";
import {RoleRepository} from "./repositories/role.repository";
import {PermissionRepository} from "./repositories/permission.repository";
import {PermissionEntity} from "./entities/permission.entity";
import {RoleHelper} from "./role.helper";
import {RegisterRoles} from "./abstract.permission";


@Injectable()
export class RoleRegister implements OnApplicationBootstrap {


    private registerResolve
    registerFinish: Promise<boolean>
    private roles: Set<RoleEntity> = new Set()
    private permissions: Set<PermissionEntity> = new Set()

    constructor(private roleRepository: RoleRepository, private readonly permissionRepository: PermissionRepository) {
        this.registerFinish =  new Promise((resolve) =>{
            this.registerResolve = resolve;
        });
    }

    registerRoles(roles: RegisterRoles, lock: boolean = true): void{
        roles.forEach(role => {

            let roleEntity: RoleEntity

            roleEntity = {
                ...role,
                permissions: role.permissions.map(permission => {
                    let permissionEntity: PermissionEntity
                    permissionEntity = {
                        ...permission,
                        updatedAt: undefined, createdAt: undefined, id: undefined
                    }

                    return permissionEntity
                }),
                updatedAt: undefined, createdAt: undefined, id: undefined, default: lock
            }

            return this.roles.add(roleEntity)
        })
    }


    async onApplicationBootstrap() {
        let rolesUpdated: Set<RoleEntity> = new Set<RoleEntity>()
        for (const role of this.roles) {
            this.roles.delete(role)
            rolesUpdated.add(await this.registerRole(role))
        }
        this.roles = rolesUpdated
        await this.deleteUnused()
        this.registerResolve(true)
    }


    async registerRole(role: RoleEntity): Promise<RoleEntity>{

        role.permissions = await Promise.all(
            role.permissions.map(
                async (permission) => await this.registerPermission(permission, role)
            )
        )

        let oldRole: RoleEntity = await this.roleRepository.findOne({name: role.name})
        if (oldRole){
            role = await this.roleRepository.findOneAndUpdate({name: role.name},{
                ...oldRole,
                category: role.category,
                permissions: role.permissions
            })
        }
        else {
            role = await this.roleRepository.create({
                ...role,
                permissions: role.permissions,
            })
        }
        return role;
    }
    async registerPermission(permissionEntity: PermissionEntity, roleEntity: RoleEntity): Promise<PermissionEntity>{
        permissionEntity.name = roleEntity.category+'.'+permissionEntity.name
        let oldPermission: PermissionEntity = await this.permissionRepository.findOne({name: permissionEntity.name})
        if (oldPermission) {
            oldPermission.description = permissionEntity.description
            permissionEntity = await this.permissionRepository.findOneAndUpdate(oldPermission.id, oldPermission)
        } else {
            permissionEntity = await this.permissionRepository.create({
                ...permissionEntity,
            })
        }
        this.permissions.add(permissionEntity)

        return permissionEntity;
    }

    private async deleteUnused() {
        await this.deleteUnusedRole()
        await this.deleteUnusedPermission()

        RoleHelper.defaultRole = await this.roleRepository.findOne({name: RoleHelper.defaultRoleName})
    }

    private async deleteUnusedRole() {

        const legacyRoleDefault = await this.roleRepository.find({default: true})
        for (const role of legacyRoleDefault) {
            let containsRole: boolean
            for (const roleRegister of this.roles) {
                if (roleRegister.id === role.id) {
                    containsRole = true;
                    break;
                }
            }
            if(!containsRole){
                await this.roleRepository.findOneAndRemove(role.id)
            }
        }
    }

    private async deleteUnusedPermission() {
        const legacyPermissionDefault = await this.permissionRepository.find()

        for (const permission of legacyPermissionDefault) {
            let containsPermission: boolean
            for (const permissionRegister of this.permissions) {
                if (permissionRegister.id === permission.id) {
                    containsPermission = true;
                    break;
                }
            }
            if(!containsPermission){
                await this.permissionRepository.findOneAndRemove(permission.id)
            }
        }
    }
}