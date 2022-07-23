import mongoose from "mongoose";

export function searchOne(FilterQuery: string|object): object {
    if(FilterQuery instanceof mongoose.Types.ObjectId){
        FilterQuery = {'_id': FilterQuery}
    }
    else if(typeof FilterQuery  == 'string'){
        FilterQuery = {'_id': FilterQuery}
    }
    return FilterQuery
}