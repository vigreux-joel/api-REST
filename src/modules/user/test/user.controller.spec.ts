import {appOption} from "../../../start";
import {MongooseModule} from "@nestjs/mongoose"
import {Test, TestingModule} from "@nestjs/testing"
import { UserService } from "../user.Service"
import { userStub } from "./stubs/user.stub"
import {UserSchema} from "../schema/user.schema";
import {ConfigModule} from "@nestjs/config";
import {CreateUserDto} from "../dto/create-user.dto";
import {UserRepository} from "../user.repository";
import {INestApplication} from "@nestjs/common";
import {UserController} from "../user.controller";
import * as request from 'supertest';
import {UserHelper} from "../user.helper";
import {DatabaseModule} from "../../database/database.module";
import {DatabaseHelper} from "../../database/database.helper";

describe('UserController', () => {
  let userService: UserService;
  let user
  let payload: CreateUserDto =  userStub();
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService, UserRepository,
      ],
      imports: [
        DatabaseModule,
        DatabaseHelper.modelRegister(UserHelper.modelName, UserSchema)
      ],
    }).compile()

    userService = moduleRef.get<UserService>(UserService);

    app = moduleRef.createNestApplication();
    await appOption(app)
    await app.init();
  })

  describe('create', () => {
    let response

    beforeAll(async () => {
      while(user === undefined){
        response = await request(app.getHttpServer())
            .post('/'+UserHelper.entityName)
            .send(payload)
        if(response.status == 403 && response.body.code == 11000){
          payload.email="e"+payload.email
          continue
        }

        user = response.body
      }
    })

    it('should return a user', () => {
      expect(response.status).toBe(201)
      expect(user).toEqual({
        __v: 0,
        _id: user._id,
        ...payload,
        password: user.password,
        createdAt: user.createdAt,
        avatar: undefined
      });
    })

    it('should hash the password', () => {
      expect(user.payload).not.toEqual(payload.password);
    })

    it('should throw an error when an email is already used', async () => {
      const response = await request(app.getHttpServer())
          .post('/'+UserHelper.entityName)
          .send(payload)
      expect(response.status).toBe(403)
    })
  })


  describe('find', () => {

    describe('findOne', () => {
      it('should return a user', async () => {
        const response = await request(app.getHttpServer())
            .get('/'+UserHelper.entityName+'/'+user._id)

        expect(response.status).toBe(200)
        expect({
            "__v": 0,
            ...response.body
          }).toEqual(user)
      })

      it('should throw an error when not found user',  async () => {
        const response = await request(app.getHttpServer())
            .get('/'+UserHelper.entityName+'/its_a_test')

        expect(response.status).toBe(404)
        expect(response.body.error).not.toBeUndefined()
      })
    })

    describe('All', () => {
      it('should return a user list', async () => {
        const response = await request(app.getHttpServer())
            .get('/'+UserHelper.entityName)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(
            expect.arrayContaining([user]),
        );
      })
    })
  })

  describe('update', () => {
    let response
    beforeAll(async () => {
      payload = {
        ...payload,
        firstname: 'toto',
        password: undefined
      }
      user = {
        ...user,
        firstname: 'toto'
      }

      response = await request(app.getHttpServer())
        .patch('/'+UserHelper.entityName+'/'+user._id)
        .send(payload)

    })

    test('return the modified user', async () => {
      expect(response.body).toEqual(user)
    })
  })

  describe('delete', () => {
    let response
    beforeAll(async () => {
      response = await request(app.getHttpServer())
          .delete('/'+UserHelper.entityName+'/'+user._id)
    })
    test('return the deleted user', async () => {
      expect(response.body).toEqual(user)
    })
  })

  afterAll(async () => {
    await app.close();
  });

})