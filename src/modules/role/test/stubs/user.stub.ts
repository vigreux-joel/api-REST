import {RoleEntity} from "../../entities/role.entity";

export const roleStub = (): RoleEntity => {
 return {
     category: "", updatedAt: undefined,
     default: false,
     createdAt: undefined,
     id: "",
     name: "",
     permissions: null
 }
}