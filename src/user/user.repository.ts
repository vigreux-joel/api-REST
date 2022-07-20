import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";
import {UserDocument} from "./schema/user.schema";


@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
    constructor(@InjectModel('User') userModel: Model<UserDocument>) {
      super(userModel)
    }
}