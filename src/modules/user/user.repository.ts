import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";
import {UserDocument} from "./schema/user.schema";
import {UserHelper} from "./user.helper";

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
    constructor(@InjectModel(UserHelper.modelName) userModel: Model<UserDocument>) {
      super(userModel)
    }
}