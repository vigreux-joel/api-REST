import mongoose from "mongoose";
import {MongooseModule} from "@nestjs/mongoose";

export class DatabaseHelper {

    static moduleName: string = 'database'

    static modelRegister<T>(modelName: string, schema: mongoose.Schema<T>){
        return MongooseModule.forFeature([{ name: modelName, schema: schema }])
    }

    static searchOne(FilterQuery: string|object): object {
        if(FilterQuery instanceof mongoose.Types.ObjectId){
            FilterQuery = {'_id': FilterQuery}
        }
        else if(typeof FilterQuery  == 'string'){
            FilterQuery = {'_id': FilterQuery}
        }
        return FilterQuery
    }

}