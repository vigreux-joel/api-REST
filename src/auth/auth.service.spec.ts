import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {getModelToken} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserDocument} from "../user/schema/user.schema";

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          JwtService,
          AuthService,
          UserService,
          {
              provide: getModelToken('User'),
              useValue: Model
          },
      ]
    }).compile();

    userModel = module.get<Model<UserDocument>>(getModelToken('User'));
    userService = module.get<UserService>(UserService)
    jwtService = module.get<JwtService>(JwtService);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
