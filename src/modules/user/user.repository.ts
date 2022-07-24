import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";
import {UserDocument} from "./schema/user.schema";
import {userHelper} from "./user.const";


@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
    constructor(@InjectModel(userHelper.entityName.ucfirst()) userModel: Model<UserDocument>) {
      super(userModel)
    }
}