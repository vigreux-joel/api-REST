import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {Exclude} from "class-transformer";
import {IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, MaxLength, MinLength} from "class-validator";
import {UserInterface} from "../interfaces/user.interface";
import { RoleEntity } from "src/modules/role/entities/role.entity";
import {ReadUserDto} from "../dto/read-user.dto";
import {PermissionEntity} from "../../role/entities/permission.entity";

export class UserEntity extends AbstractEntity implements UserInterface {

    roles: RoleEntity[];
    // get roles(): RoleEntity[]{
    //     let test: RoleEntity = new RoleEntity()
    //     const perm: PermissionEntity = new PermissionEntity()
    //     perm.description = 'description test'
    //     perm.name = 'testaussi'
    //     test.permissions = [perm]
    //     return [test]
    // }


    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
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