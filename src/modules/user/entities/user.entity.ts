import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {Exclude} from "class-transformer";
import {IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength} from "class-validator";
import {UserInterface} from "../interfaces/user.interface";
import { RoleEntity } from "src/modules/role/entities/role.entity";

export class UserEntity extends AbstractEntity implements UserInterface {

    roles: RoleEntity;

    @IsNotEmpty()
    @MinLength(3)
    @IsAlpha()
    firstname: string;

    @IsNotEmpty()
    @MinLength(3)
    @IsAlpha()
    lastname: string;

    @IsNotEmpty()
    @MinLength(3)
    @IsEmail()
    email: string;

    avatar: string;

    @IsPhoneNumber()
    @IsOptional()
    tel: string;

    @IsNotEmpty()
    @MinLength(8)
    @Exclude({ toPlainOnly: true })
    password: string;
}