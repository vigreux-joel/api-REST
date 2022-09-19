import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {UserHelper} from "../user.helper";
import {DatabaseRepository} from "../../database/database.repository";
import {UserDocument} from "../schema/user.schema";

@Injectable()
export class UserRepository extends DatabaseRepository<UserDocument> {
    constructor(@InjectModel(UserHelper.modelName) userModel: Model<UserDocument>) {
      super(userModel)
    }
}
