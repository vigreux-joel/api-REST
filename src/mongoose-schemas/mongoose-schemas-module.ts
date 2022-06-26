import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {BlogSchema} from "../blog/blog.schema";
import {AdminSchema} from "../admin/admin.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
    ],
    exports: [MongooseModule],
})
export class MongooseSchemasModule {}
