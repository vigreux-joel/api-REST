import {appOption} from "../../../start";
import * as request from 'supertest';
import {AuthService} from "../auth.service";
import {UserModule} from "../../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "../strategies/local.strategy";
import {JwtStrategy} from "../strategies/jwt.strategy";
import {AuthController} from "../auth.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication} from "@nestjs/common";
import {UserSchema} from "../../user/schema/user.schema";
import {CreateUserDto} from "../../user/dto/create-user.dto";
import {userStub} from "../../user/test/stubs/user.stub";
import {UserHelper} from "../../user/user.helper";
import {DatabaseModule} from "../../database/database.module";
import {DatabaseHelper} from "../../database/database.helper";

describe('UserController', () => {
  let authService: AuthService
  let jwtStrategy: JwtStrategy
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: process.env.APP_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
        DatabaseModule,
        DatabaseHelper.modelRegister(UserHelper.modelName, UserSchema),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      controllers: [AuthController],
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService);
    jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy);

    app = moduleRef.createNestApplication();
    await appOption(app)
    await app.init();
  })

  describe('login', () => {
    it('should integrate access if not connected', async () => {
      const response = await request(app.getHttpServer())
          .post('/login')
      expect(response.status).toBe(401)
      expect(response.body).toEqual({ statusCode: 401, message: 'Unauthorized' })
    })

    let user;
    let payload: CreateUserDto =  userStub();
    beforeAll(async () => {
      while(user === undefined){
        const response = await request(app.getHttpServer())
            .post('/user')
            .send(payload)
        if(response.status == 403 && response.body.code == 11000){
          payload.email="e"+payload.email
          continue
        }
        user = response.body
      }
    })

    it('should return a token', async () => {
      const response = await request(app.getHttpServer())
          .post('/login')
          .send({
            "identifier": payload.email,
            "password": payload.password
          })

      expect(response.body.access_token).not.toBeUndefined()
      expect(response.status).toBe(201)
    })

    afterAll(async () => {
      const response = await request(app.getHttpServer())
          .delete('/user/'+user.id)
      expect(response.status).toBe(200)
    });
  })

  afterAll(async () => {
    await app.close();
  });

})