import {RoleEntity} from "../../role/entities/role.entity";
import {AbstractEntity} from "../../../utils/abstract.entity";

export interface UserInterface extends AbstractEntity {
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
    tel?: string;
    password: string;
    roles?: RoleEntity[]
}