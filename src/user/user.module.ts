import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schema/user.schema";
import {UserEntity} from "./entities/user.entity";
import {MongooseSchemasModule} from "../mongoose-schemas/mongoose-schemas-module";

@Module({
  imports: [MongooseSchemasModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
