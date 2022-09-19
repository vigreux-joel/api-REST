import mongoose from "mongoose";

export function SchemaTransform(entity){
    return (doc, ret, options) => {

        Object.keys(ret).forEach(key => {
            if (ret[key] instanceof mongoose.Types.ObjectId) {
                ret[key] = ret[key].toString()
            }
            else if(Array.isArray(ret[key]) && ret[key][0] instanceof mongoose.Types.ObjectId){
                ret[key] = ret[key].map(id => id.toString())
            }
        })
        Object.setPrototypeOf(ret, Object.getPrototypeOf(new entity()));
    }
}