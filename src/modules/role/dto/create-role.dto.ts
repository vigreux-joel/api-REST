import {ReadRoleDto} from "./read-role.dto";
import {IntersectionType, OmitType} from "@nestjs/swagger";
import {RoleEntity} from "../entities/role.entity";
import {getAbstractEntityProperties} from "../../../utils/abstract.entity";

export class CreateRoleDto extends IntersectionType(ReadRoleDto, OmitType(RoleEntity, [...getAbstractEntityProperties()])) {}
