import {UserEntity} from "../../entities/user.entity";

export const userStub = (): UserEntity => {
 return {
     avatar: "",
     createdAt: null,
     firstname: "john",
     lastname: "snow",
     password: "Azertyuiop",
     tel: "+33110000000",
     email: 'test@example.com'
 }
}