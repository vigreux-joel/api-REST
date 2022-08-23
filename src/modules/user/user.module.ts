import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {UserRepository} from "./user.repository";
import {UserHelper} from "./user.helper";
import {DatabaseHelper} from "../database/database.helper";
import {RoleModule} from "../role/role.module";
import {UserSchema} from "./schema/user.schema"
import {UserPermission} from "./user.permission";

@Module({
  imports: [
      DatabaseHelper.modelRegister(UserHelper.modelName, UserSchema),
      RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserPermission],
  exports: [UserService]
})
export class UserModule {
}
