import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schema/user.schema";
import {User} from "./entities/user.entity";
import {UserRepository} from "./user.repository";
import {helper} from "./user.const";

@Module({
  imports: [MongooseModule.forFeature([{ name: helper.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
