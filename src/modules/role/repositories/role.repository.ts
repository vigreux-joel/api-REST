import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from "mongoose";
import {RoleHelper} from "../role.helper";
import {DatabaseRepository} from "../../database/database.repository";
import {RoleDocument} from "../schema/role.schema";

@Injectable()
export class RoleRepository extends DatabaseRepository<RoleDocument> {
    constructor(@InjectModel(RoleHelper.modelName) roleModel: Model<RoleDocument>) {
      super(roleModel)
    }

}