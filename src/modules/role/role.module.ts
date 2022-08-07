import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {RoleRepository} from "./repositories/role.repository";
import {RoleHelper} from "./role.helper";
import {DatabaseHelper} from "../database/database.helper";
import {RoleSchema} from "./entities/role.entity";
import {PermissionRepository} from "./repositories/permission.repository";
import {PermissionSchema} from "./entities/permission.entity";

@Module({
  imports: [
      DatabaseHelper.modelRegister(RoleHelper.modelName, RoleSchema),
      DatabaseHelper.modelRegister('Permission', PermissionSchema),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, PermissionRepository],
  exports: [RoleService]
})
export class RoleModule {}
