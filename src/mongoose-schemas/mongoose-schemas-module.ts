import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../user/user.schema";
import {BlogSchema} from "../blog/blog.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Blog', schema: BlogSchema }
        ]),
    ],
    exports: [MongooseModule],
})
export class MongooseSchemasModule {}
