import {RoleEntity} from "../../entities/role.entity";

export const roleStub = (): RoleEntity => {
 return {
     default: false,
     createdAt: undefined,
     id: "",
     name: "",
     permissions: null
 }
}