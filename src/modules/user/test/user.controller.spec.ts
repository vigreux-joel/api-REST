import {appOption} from "../../../start";
import {Test, TestingModule} from "@nestjs/testing"
import { UserService } from "../user.Service"
import { userStub } from "./stubs/user.stub"
import {CreateUserDto} from "../dto/create-user.dto";
import {UserRepository} from "../repositories/user.repository";
import {INestApplication} from "@nestjs/common";
import {UserController} from "../user.controller";
import * as request from 'supertest';
import {UserHelper} from "../user.helper";
import {DatabaseModule} from "../../database/database.module";
import {DatabaseHelper} from "../../database/database.helper";
import {UserEntity} from "../entities/user.entity";
import {UserSchema} from "../schema/user.schema";

describe('UserController', () => {
  let userService: UserService;
  let user: UserEntity
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

        user = {...response.body, password: undefined}
      }
    })

    it('should return a user', () => {

      expect(response.status).toBe(201)
      expect(user).toEqual({
        ...payload,
        id: user.id,
        createdAt: user.createdAt,
        avatar: undefined,
        password: undefined
      });
    })

    it('should hash the password', () => {
      expect(user.password).not.toEqual(payload.password);
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
            .get('/'+UserHelper.entityName+'/'+user.id)

        expect(response.body).toEqual(user)
        expect(response.status).toBe(200)
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
            .query({page: 1})
            .query({limit: 1})

        expect(response.status).toBe(200)
        expect(response.body.meta).toEqual({
          ...response.body.meta,
          page: 1,
          limit: 1,
        })
        expect(response.body.items).toEqual(
            [user]
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
        .patch('/'+UserHelper.entityName+'/'+user.id)
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
          .delete('/'+UserHelper.entityName+'/'+user.id)
    })
    test('return the deleted user', async () => {
      expect(response.body).toEqual(user)
    })
  })

  afterAll(async () => {
    await app.close();
  });

})