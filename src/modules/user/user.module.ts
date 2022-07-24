import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {UserSchema} from "./schema/user.schema";
import {UserRepository} from "./user.repository";
import {UserHelper} from "./user.helper";
import {DatabaseHelper} from "../database/database.helper";

@Module({
  imports: [
      DatabaseHelper.modelRegister(UserHelper.modelName, UserSchema)
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
