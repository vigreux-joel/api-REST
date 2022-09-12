import {Prop} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {Exclude, Expose, Transform} from "class-transformer";
import {IsDateString, IsMongoId} from "class-validator";
import {ObjectId} from "mongoose";


export const getAbstractEntityProperties:any = ()=> Object.getOwnPropertyNames(new AbstractEntity())

export class AbstractEntity {

    @Expose({ name: 'id' })
    @Transform((value) => value.obj._id?.toString())
    public _id?: ObjectId = undefined;

    @IsMongoId()
    @ApiProperty({ example: '72dfe827795fddb48be5e3eb'})
    public id: string = undefined;

    @Exclude()
    public __v?: number

    @Prop({
        type: Date,
        required: true,
    })
    @IsDateString()
    @ApiProperty({ example: '2022-06-30T12:10:27.092Z'})
    public createdAt: Date = undefined;

    @Prop({
        type: Date,
        required: true,
    })
    @IsDateString()
    @ApiProperty({ example: '2022-06-31T13:11:24.092Z'})
    public updatedAt: Date = undefined;
}