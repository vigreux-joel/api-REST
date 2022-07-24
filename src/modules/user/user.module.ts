import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schema/user.schema";
import {UserRepository} from "./user.repository";
import {UserHelper} from "./user.helper";

@Module({
  imports: [MongooseModule.forFeature([{ name: UserHelper.modelName, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
