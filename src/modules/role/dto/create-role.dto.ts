import {IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength} from "class-validator";
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {RoleEntity} from "../entities/role.entity";

export class CreateRoleDto extends RoleEntity{}
