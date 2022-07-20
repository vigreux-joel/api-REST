import {getModelToken, MongooseModule} from "@nestjs/mongoose"
import {Test, TestingModule} from "@nestjs/testing"
import {FilterQuery, Model, Types} from "mongoose"
import { UserService } from "../user.Service"
import { userStub } from "./stubs/user.stub"
// import { UserModel } from "./support/user.model"
import {User} from "../entities/user.entity";
import {use} from "passport";
import {UserDocument, UserSchema} from "../schema/user.schema";
import {ConfigModule} from "@nestjs/config";
import {CreateUserDto} from "../dto/create-user.dto";
import {UserRepository} from "../user.repository";
import {throws} from "assert";
import {INestApplication, ValidationPipe} from "@nestjs/common";

describe('UserService', () => {
  let userService: UserService;
  let user//: User
  let payload: CreateUserDto = new CreateUserDto()
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
      providers: [
        UserService, UserRepository,
      ]
    }).compile();
    userService = moduleRef.get<UserService>(UserService);

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  })


  describe('create', () => {

    beforeAll(async () => {
      payload = userStub()
      // payload.email = userStub().email
      // payload.password = userStub().password

      while(user === undefined){
        try{
          user = await userService.createUser(payload);
        } catch (e) {
          if(e.code == 11000) {
            payload.email="e"+payload.email
            continue
          }
          throw(e.message)
        }
      }
    })

    it('should return a user', () => {

      expect(user.toObject()).toEqual({
        __v: 0,
        _id: user._id,
        ...payload
      });
    })

    it('should throw an error when an email is already used', async () => {
      try{
        await userService.createUser(payload)
      } catch (e) {
        expect(e.code).toBe(11000);
      }
    })

  })



  describe('find', () => {

    describe('findOne', () => {
      it('should return a user', async () => {
        const userTemp:any = await userService.getUser(user._id)
        expect({
          "__v": 0,
          ...userTemp.toObject()

        }).toEqual(user.toObject());
      })

      it('should throw an error when not found user',  async () => {
        await expect(userService.getUser("it's a test")).rejects.toThrow();
      })
    })

    describe('findAll', () => {
      it('should return a user list', async () => {
        const users = await userService.getUsers()

        let tempUser = []
        users.forEach((user) => {
          tempUser.push(user.toObject())
        })
        expect(tempUser).toEqual(
            expect.arrayContaining([user.toObject()]),
        );
      })
    })


    // describe('findOneAndUpdate', () => {
    //
    //   test('should return a user', async () => {
    //     expect(await userService.updateUser(user._id, payload)).toEqual(user)
    //   })
    // })
  })


  describe('delete', () => {
    it('should return true', async () => {
      expect(await userService.remove(user._id)).toBeTruthy()
    })
    it('should return false if we repeat the action', async () => {
      expect(await userService.remove(user._id)).toBeFalsy()
    })
  })
})