import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DatabaseRepository} from "../../database/database.repository";
import {RoleHelper} from "../role.helper";
import {PermissionDocument} from "../schema/permission.schema";

@Injectable()
export class PermissionRepository extends DatabaseRepository<PermissionDocument> {
    constructor(@InjectModel('Permission') permissionModel: Model<PermissionDocument>) {
      super(permissionModel)
    }

    async resetDefaultPermission(): Promise<void> {
        await this.entityModel.deleteMany({ name: new RegExp(RoleHelper.prefixDefaultPermission) })
    }
}