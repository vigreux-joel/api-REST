import {AbstractEntity} from "../../../utils/abstract.entity";
import {Exclude, Transform, Type} from "class-transformer";
import {
    IsAlpha,
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    MaxLength,
    MinLength,
    ValidateNested
} from "class-validator";
import {UserInterface} from "../interfaces/user.interface";
import { RoleEntity } from "src/modules/role/entities/role.entity";
import {RoleHelper} from "../../role/role.helper";

export class UserEntity extends AbstractEntity implements UserInterface {

    @Transform(({ value }) => {
        let contain: boolean
        for(let role of value) {
            if(role._id == RoleHelper.defaultRole.id){
                contain = true
                break;
            }
        }

        if(!contain){
            value.push(RoleHelper.defaultRole)
        }
        return value
    })
    @Transform(({ value }) => value.map(role => (role.name)?role.name:role),{ toPlainOnly: true })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RoleEntity)
    roles: RoleEntity[] = [RoleHelper.defaultRole]

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
    @Exclude({toPlainOnly: true})
    password: string;
}