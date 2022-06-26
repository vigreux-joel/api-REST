import { Module } from '@nestjs/common';
import AdminJS from "adminjs";
import * as AdminJSMongoose from '@adminjs/mongoose'
import {BlogModule} from "../blog/blog.module";
import {AdminModule as Admin} from "@adminjs/nestjs";
import {getModelToken} from "@nestjs/mongoose";
import {Blog} from "../blog/blog.schema";
import {Model} from "mongoose";
import {MongooseSchemasModule} from "../mongoose-schemas/mongoose-schemas-module";

AdminJS.registerAdapter(AdminJSMongoose)

@Module({
    imports: [
        Admin.createAdminAsync({
            imports: [
                MongooseSchemasModule,
            ],
            inject: [
                getModelToken('Admin'),
            ],
            useFactory: (adminModel: Model<Admin>) => ({
                adminJsOptions: {
                    rootPath: '/admin',
                    resources: [
                        { resource: adminModel },
                    ],
                    auth: {
                        authenticate: async (email, password) => Promise.resolve({ email: 'test' }),
                        cookieName: 'test',
                        cookiePassword: 'testPass',
                    },
                },
            }),
        }),
    ]
})
export class AdminModule {}
