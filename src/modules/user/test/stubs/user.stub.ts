import {UserEntity} from "../../entities/user.entity";

export const userStub = (): UserEntity => {
 return {
     updatedAt: undefined,
     roles: undefined,
     id: 'fakeId',
     avatar: "",
     createdAt: null,
     firstname: "john",
     lastname: "snow",
     password: "Azertyuiop",
     tel: "+33110000000",
     email: 'test@example.com'
 }
}