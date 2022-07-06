import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Model} from "mongoose";
import {UserDocument} from "./schema/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {UserEntity} from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.createdAt = new Date()
    createUserDto.password = await this.hashPassword(createUserDto.password)

    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(filter: string|object) {
    if(typeof filter  == 'string'){
      filter = {'_id': filter}
    }
    let result
    try {
      result = await this.userModel.find(filter);
    } catch (e){
      throw ({message: 'invalid id'})
    }
    if (!result.length){
      throw ({message: 'not found user'})
    }
    return result
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await this.hashPassword(updateUserDto.password)

    let result
    result = await this.userModel.findOneAndUpdate({'_id': id}, updateUserDto, {returnOriginal: false});
    if (!result) {
      throw ({message: 'not found user'})
    }
    return result
  }

  async remove(id: string) {
    let result
    try {
      result = await this.userModel.findOneAndRemove({'_id': id});
    } catch (e) {
      throw ({message: 'invalid id'})
    }
    if (!result) {
      throw ({message: 'not found user'})
    }
    return result
  }

  async hashPassword(password, saltRounds = 10): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
