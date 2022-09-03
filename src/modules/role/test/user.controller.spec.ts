import {appOption} from "../../../start";
import {Test, TestingModule} from "@nestjs/testing"
import { RoleService } from "../role.Service"
import { roleStub } from "./stubs/role.stub"
import {CreateRoleDto} from "../dto/create-role.dto";
import {RoleRepository} from "../repositories/role.repository";
import {INestApplication} from "@nestjs/common";
import {RoleController} from "../role.controller";
import * as request from 'supertest';
import {RoleHelper} from "../role.helper";
import {DatabaseModule} from "../../database/database.module";
import {DatabaseHelper} from "../../database/database.helper";
import {RoleEntity, RoleSchema} from "../entities/role.entity";

describe('RoleController', () => {
  let roleService: RoleService;
  let role: RoleEntity
  let payload: CreateRoleDto =  roleStub();
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        RoleService, RoleRepository,
      ],
      imports: [
        DatabaseModule,
        DatabaseHelper.modelRegister(RoleHelper.modelName, RoleSchema)
      ],
    }).compile()

    roleService = moduleRef.get<RoleService>(RoleService);

    app = moduleRef.createNestApplication();
    await appOption(app)
    await app.init();
  })

  describe('create', () => {
    let response

    beforeAll(async () => {
      while(role === undefined){
        response = await request(app.getHttpServer())
            .post('/'+RoleHelper.entityName)
            .send(payload)
        if(response.status == 403 && response.body.code == 11000){
          payload.email="e"+payload.email
          continue
        }

        role = {...response.body, password: undefined}
      }
    })

    it('should return a role', () => {

      expect(response.status).toBe(201)
      expect(role).toEqual({
        ...payload,
        id: role.id,
        createdAt: role.createdAt,
        avatar: undefined,
        mimetype: undefined,
        password: undefined
      });
    })

    it('should hash the password', () => {
      expect(role.password).not.toEqual(payload.password);
    })

    it('should throw an error when an email is already used', async () => {
      const response = await request(app.getHttpServer())
          .post('/'+RoleHelper.entityName)
          .send(payload)
      expect(response.status).toBe(403)
    })
  })


  describe('find', () => {

    describe('findOne', () => {
      it('should return a role', async () => {
        const response = await request(app.getHttpServer())
            .get('/'+RoleHelper.entityName+'/'+role.id)

        expect(response.body).toEqual(role)
        expect(response.status).toBe(200)
      })

      it('should throw an error when not found role',  async () => {
        const response = await request(app.getHttpServer())
            .get('/'+RoleHelper.entityName+'/its_a_test')

        expect(response.status).toBe(404)
        expect(response.body.error).not.toBeUndefined()
      })
    })

    describe('All', () => {
      it('should return a role list', async () => {
        const response = await request(app.getHttpServer())
            .get('/'+RoleHelper.entityName)
            .query({page: 1})
            .query({limit: 1})

        expect(response.status).toBe(200)
        expect(response.body.meta).toEqual({
          ...response.body.meta,
          page: 1,
          limit: 1,
        })
        expect(response.body.items).toEqual(
            [role]
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
      role = {
        ...role,
        firstname: 'toto'
      }

      response = await request(app.getHttpServer())
        .patch('/'+RoleHelper.entityName+'/'+role.id)
        .send(payload)

    })

    test('return the modified role', async () => {
      expect(response.body).toEqual(role)
    })
  })

  describe('delete', () => {
    let response
    beforeAll(async () => {
      response = await request(app.getHttpServer())
          .delete('/'+RoleHelper.entityName+'/'+role.id)
    })
    test('return the deleted role', async () => {
      expect(response.body).toEqual(role)
    })
  })

  afterAll(async () => {
    await app.close();
  });

})