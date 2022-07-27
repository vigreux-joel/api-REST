import {Prop} from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import {ApiProperty} from "@nestjs/swagger";
import {Exclude, Expose, Transform} from "class-transformer";
import {IsMongoId} from "class-validator";

export abstract class AbstractEntity {

    @IsMongoId()
    @Expose({ name: 'id' })
    @Transform((value) => value.obj._id.toString())
    public _id?: string;

    @IsMongoId()
    @ApiProperty({ example: '72dfe827795fddb48be5e3eb'})
    public id: string

    @Exclude()
    public __v: number

    @Prop({
        type: Date,
    })
    @ApiProperty({ example: '2022-06-30T12:10:27.092Z'})
    public createdAt: Date;
}