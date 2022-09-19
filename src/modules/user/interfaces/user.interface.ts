import {RoleEntity} from "../../role/entities/role.entity";
import {AbstractEntity} from "../../../utils/abstract.entity";
import {LocalFile} from "../../localFile/entities/localFile.entity";

export interface UserInterface extends AbstractEntity {
    firstname: string;
    lastname: string;
    email: string;
    avatar: LocalFile;
    tel?: string;
    password: string;
    roles?: RoleEntity[]
}
