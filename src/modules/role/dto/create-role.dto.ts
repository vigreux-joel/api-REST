import {ReadRoleDto} from "./read-role.dto";
import {IntersectionType, OmitType} from "@nestjs/swagger";
import {ReadUserDto} from "../../user/dto/read-user.dto";
import {UserEntity} from "../../user/entities/user.entity";
import {RoleEntity} from "../entities/role.entity";

export class CreateRoleDto extends IntersectionType(ReadRoleDto, OmitType(RoleEntity, ['id', 'createdAt'])) {}
