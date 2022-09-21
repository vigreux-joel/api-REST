import {UserEntity} from "../../entities/user.entity";

export const userStub = (): UserEntity => {
 return <UserEntity>{
     updatedAt: new Date(),
     roles: [],
     id: 'fakeId',
     avatar: {
         mimetype: 'image/png',
         path: './uploadedFiles/avatars',
         size: 420,
     },
     createdAt: new Date(),
     firstname: "john",
     lastname: "snow",
     password: "Azertyuiop",
     tel: "+33110000000",
     email: 'test@example.com'
 }
}