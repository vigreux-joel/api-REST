import {RoleEntity} from "../../role/entities/role.entity";
import {AbstractEntity} from "../../../utils/abstract.entity";
import {LocalFileEntity} from "../../localFile/entities/localFile.entity";

export interface UserInterface extends AbstractEntity {
    firstname: string;
    lastname: string;
    email: string;
    avatar: LocalFileEntity;
    tel?: string;
    password: string;
    roles?: RoleEntity[]
}
