import {RoleEntity} from "../../role/entities/role.entity";
import {AbstractEntity} from "../../../utils/api/AbstractEntity";

export interface UserInterface extends AbstractEntity {
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
    tel: string;
    password: string;
    roles: RoleEntity
}