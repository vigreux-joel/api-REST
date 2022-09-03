import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {LocalFile} from "../entities/localFile.entity";
import {LocalFileInterface} from "../interfaces/localFile.interface";

@Schema({
    toObject: {
        transform: function(doc, ret, options) {
            Object.setPrototypeOf(ret, Object.getPrototypeOf(new LocalFile()));
        }
    },
})
class SchemaProperties extends AbstractEntity implements LocalFileInterface{

    @Prop({
    })
    filename: string;

    @Prop({
    })
    path: string;

    @Prop({
    })
    mimetype: string;

}

export type LocalFileDocument = SchemaProperties & Document;
export const LocalFileSchema = SchemaFactory.createForClass(SchemaProperties);