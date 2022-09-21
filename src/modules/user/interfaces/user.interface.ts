import {RoleEntity} from "../../role/entities/role.entity";
import {AbstractEntity} from "../../../utils/abstract.entity";
import {FileSystemStoredFile} from "nestjs-form-data";

export interface UserInterface extends AbstractEntity {
    firstname: string;
    lastname: string;
    email: string;
    avatar: FileSystemStoredFile;
    tel?: string;
    password: string;
    roles?: RoleEntity[]
}
