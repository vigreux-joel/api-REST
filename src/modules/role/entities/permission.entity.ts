import {AbstractEntity} from "../../../utils/abstract.entity";
import {IsAlpha, IsNotEmpty} from "class-validator";
import {PermissionInterface} from "../interfaces/permission.interface";

export class PermissionEntity extends AbstractEntity implements PermissionInterface{
    @IsNotEmpty()
    @IsAlpha()
    name: string

    @IsNotEmpty()
    @IsAlpha()
    description: string

    @IsNotEmpty()
    @IsAlpha()
    category: string;
}
