import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schema/user.schema";
import {UserRepository} from "./user.repository";
import {userHelper} from "./user.const";

@Module({
  imports: [MongooseModule.forFeature([{ name: userHelper.entityName.ucfirst(), schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
