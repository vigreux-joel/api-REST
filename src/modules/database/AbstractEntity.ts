import {Prop} from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import {ApiProperty} from "@nestjs/swagger";
import {Transform} from "class-transformer";

export abstract class AbstractEntity {

    @Transform((value) => value.obj._id.toString())
    public _id: string;

    @Prop({
        type: Date,
    })
    @ApiProperty({ example: '2022-06-30T12:10:27.092Z'})
    public createdAt: Date;
}