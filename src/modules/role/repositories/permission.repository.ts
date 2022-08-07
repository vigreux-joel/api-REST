import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import {DatabaseRepository} from "../../database/database.repository";
import {PermissionDocument} from "../entities/permission.entity";
import {RoleDocument} from "../entities/role.entity";
import {RoleHelper} from "../role.helper";

@Injectable()
export class PermissionRepository extends DatabaseRepository<PermissionDocument> {
    constructor(@InjectModel('Permission') permissionModel: Model<PermissionDocument>) {
      super(permissionModel)
    }

    async resetDefaultPermission(): Promise<void> {
        await this.entityModel.deleteMany({ name: new RegExp(RoleHelper.prefixDefaultPermission) })
    }
}