import {UserEntity} from "../../entities/user.entity";

export const userStub = (): UserEntity => {
 return {
     updatedAt: new Date(),
     roles: [],
     id: 'fakeId',
     avatar: "example.png",
     createdAt: new Date(),
     firstname: "john",
     lastname: "snow",
     password: "Azertyuiop",
     tel: "+33110000000",
     email: 'test@example.com'
 }
}