import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {RoleRepository} from "./repositories/role.repository";
import {RoleHelper} from "./role.helper";
import {DatabaseHelper} from "../database/database.helper";
import {PermissionRepository} from "./repositories/permission.repository";
import {PermissionSchema} from "./schema/permission.schema";
import {RoleSchema} from "./schema/role.schema";
import {RoleFactory} from "./role.factory";

@Module({
  imports: [
      DatabaseHelper.modelRegister(RoleHelper.modelName, RoleSchema),
      DatabaseHelper.modelRegister('Permission', PermissionSchema),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, PermissionRepository, RoleFactory],
  exports: [RoleService]
})
export class RoleModule {}
