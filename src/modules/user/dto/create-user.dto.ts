import {IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength} from "class-validator";
import {ApiProperty, OmitType} from "@nestjs/swagger";
import {UserEntity} from "../entities/user.entity";

export class CreateUserDto extends OmitType(UserEntity, ['id', 'createdAt']){}
