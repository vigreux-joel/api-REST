import {ApiProperty} from "@nestjs/swagger";
import {AbstractEntity} from "../../../utils/abstract.entity";
import {IsAlpha, IsArray, IsBoolean, IsNotEmpty, MinLength, ValidateNested} from "class-validator";
import {PermissionEntity} from "./permission.entity";
import {RoleInterface} from "../interfaces/role.interface";
import {Type} from "class-transformer";

export class RoleEntity extends AbstractEntity implements RoleInterface{
    @IsNotEmpty()
    @MinLength(3)
    @IsAlpha()
    @ApiProperty({ example: 'ROLE_ADMIN'})
    name: string

    @IsNotEmpty()
    @IsAlpha()
    category: string;

    @IsBoolean()
    @ApiProperty({ example: true})
    default: boolean

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PermissionEntity)
    permissions: PermissionEntity[]
}
