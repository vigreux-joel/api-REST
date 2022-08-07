import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {UserRepository} from "./user.repository";
import {UserHelper} from "./user.helper";
import {DatabaseHelper} from "../database/database.helper";
import {UserSchema} from "./entities/user.entity";
import {RoleModule} from "../role/role.module";

@Module({
  imports: [
      DatabaseHelper.modelRegister(UserHelper.modelName, UserSchema),
      RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
