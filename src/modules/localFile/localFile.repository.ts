import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {DatabaseRepository} from "../database/database.repository";
import {LocalFileDocument} from "./schema/localFile.schema";
import {LocalFile} from "./entities/localFile.entity";

@Injectable()
export class UserRepository extends DatabaseRepository<LocalFileDocument> {
    constructor(@InjectModel("LocalFile") localFileModel: Model<LocalFileDocument>) {
        super(localFileModel)
    }
}