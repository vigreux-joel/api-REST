import {AbstractEntity} from "../../../utils/api/AbstractEntity";
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
