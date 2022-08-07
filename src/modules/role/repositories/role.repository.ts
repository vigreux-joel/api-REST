import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import {RoleHelper} from "../role.helper";
import {DatabaseRepository} from "../../database/database.repository";
import {RoleDocument} from "../entities/role.entity";

@Injectable()
export class RoleRepository extends DatabaseRepository<RoleDocument> {
    constructor(@InjectModel(RoleHelper.modelName) roleModel: Model<RoleDocument>) {
      super(roleModel)
    }
}