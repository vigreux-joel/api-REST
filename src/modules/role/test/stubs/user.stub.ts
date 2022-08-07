import {RoleEntity} from "../../entities/role.entity";

export const roleStub = (): RoleEntity => {
 return {
     createdAt: undefined,
     id: "",
     name: "",
     permissions: null
 }
}