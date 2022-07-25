import {Prop} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";

export abstract class AbstractEntity {

    public id: string;

    @Prop({
        type: Date,
    })
    @ApiProperty({ example: '2022-06-30T12:10:27.092Z'})
    public createdAt: Date;
}