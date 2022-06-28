import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../user/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Admin', schema: UserSchema }]),
    ],
    exports: [MongooseModule],
})
export class MongooseSchemasModule {}
