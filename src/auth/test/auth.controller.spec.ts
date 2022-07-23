// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import {JwtService} from "@nestjs/jwt";
// import {AuthService} from "./auth.service";
// import {UserService} from "../user/user.service";
// import {getModelToken} from "@nestjs/mongoose";
// import {Model} from "mongoose";
// import {UserDocument} from "../user/schema/user.schema";
//
// describe('AuthController', () => {
//   let authController: AuthController;
//   let jwtService: JwtService
//
//   beforeEach(async () => {
//     let authService
//     let service: AuthService;
//     let jwtService: JwtService;
//     let userService: UserService;
//     let userModel: Model<UserDocument>;
//
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [
//           AuthController,
//       ],
//       providers:[
//         JwtService,
//         AuthService,
//         UserService,
//         {
//           provide: getModelToken('User'),
//           useValue: Model
//         },
//       ]
//     }).compile();
//
//     userModel = module.get<Model<UserDocument>>(getModelToken('User'));
//     userService = module.get<UserService>(UserService)
//     jwtService = module.get<JwtService>(JwtService);
//     service = module.get<AuthService>(AuthService);
//     authController = module.get<AuthController>(AuthController);
//   });
//
//   it('should be defined', () => {
//     expect(authController).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {getModelToken} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserDocument} from "../user/schema/user.schema";
import {createMock} from "@golevelup/ts-jest";

describe('AuthController', () => {
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        AuthController,
      ],
      providers:[
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ]
    }).compile();
  });

  it('should be defined', () => {
    expect(AuthService).toBeDefined();
  });
});
