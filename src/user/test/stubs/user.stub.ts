import {User} from "../../entities/user.entity";

export const userStub = (): User => {
 return {
     avatar: "",
     createdAt: null,
     firstname: "john",
     lastname: "snow",
     password: "Azertyuiop",
     tel: "1",
     email: 'test@example.com'
 }
}