import {RoleEntity} from "../../role/entities/role.entity";

export interface UserInterface {
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
    tel: string;
    password: string;
    roles: RoleEntity
}