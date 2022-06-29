import { Module } from '@nestjs/common';
import AdminJS from "adminjs";
import * as AdminJSMongoose from '@adminjs/mongoose'
import {AdminModule as Admin} from "@adminjs/nestjs";
import {getModelToken} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {MongooseSchemasModule} from "../mongoose-schemas/mongoose-schemas-module";
import {UserModule} from "../user/user.module";
import {User} from "../user/user.schema";
import {BlogModule} from "../blog/blog.module";
import {Blog} from "../blog/blog.schema";
import * as bcrypt from 'bcrypt';

AdminJS.registerAdapter(AdminJSMongoose)

@Module({
    imports: [
        Admin.createAdminAsync({
            imports: [
                MongooseSchemasModule,
                UserModule,
                BlogModule
            ],
            inject: [
                getModelToken('User'),
                getModelToken('Blog'),
            ],
            useFactory: (userModel: Model<User>, blogModel: Model<Blog>) => ({
                adminJsOptions: {
                    rootPath: '/admin',
                    resources: [
                        { resource: userModel,
                            options: {
                                parent: {
                                    name: 'Utilisateurs',
                                    icon: 'User',
                                },
                                properties: {
                                    password: {
                                        isVisible: { edit: true },
                                    },
                                    createdAt:{
                                        isVisible: { list: true, filter: true, show: true },
                                    }
                                },
                                listProperties: ['firstname','lastname','email'],
                                actions: {
                                    new: {
                                        before: async (request) => {
                                            request.payload.createdAt = new Date
                                            return request
                                        },
                                    }
                                },
                            }
                        },
                        { resource:
                            blogModel,
                            options: {
                                properties: {
                                    contents: {
                                        type: 'richtext'
                                    }
                                }
                            }
                        }
                    ],
                    branding: {
                        companyName: process.env.SITE_NAME,
                    },
                },
                // auth: {
                //     authenticate: async (email, password) => Promise.resolve({ email: 'test' }),
                //     cookieName: 'test',
                //     cookiePassword: 'test',
                // },
            }),
        }),
    ]
})
export class DashboardModule {}
