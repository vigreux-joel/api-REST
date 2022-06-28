import { Module } from '@nestjs/common';
import AdminJS from "adminjs";
import * as AdminJSMongoose from '@adminjs/mongoose'
import {AdminModule as Admin} from "@adminjs/nestjs";
import {getModelToken} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {MongooseSchemasModule} from "../mongoose-schemas/mongoose-schemas-module";
import {UserModule} from "../user/user.module";
import {User} from "../user/user.schema";

AdminJS.registerAdapter(AdminJSMongoose)

@Module({
    imports: [
        Admin.createAdminAsync({
            imports: [
                MongooseSchemasModule,
                UserModule
            ],
            inject: [
                getModelToken('User'),
            ],
            useFactory: (userModel: Model<User>) => ({
                adminJsOptions: {
                    rootPath: '/admin',
                    resources: [
                        { resource: userModel },
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
export class DashboardModule {}
