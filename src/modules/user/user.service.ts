import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, {Model, Types} from "mongoose";
import {User} from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import {UserRepository} from "./user.repository";
import {helper} from "./user.const";

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<null|User> {
    createUserDto.createdAt = new Date()
    createUserDto.password = await this.hashPassword(createUserDto.password)

    return this.repository.create(createUserDto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(filter: string|object): Promise<null|User> {
    let result: User
    result = await this.repository.findOne(filter);
    if (!result){
      throw new Error('not found '+helper.name);
    }
    return result
  }

  async update(filter: string|object, updateUserDto: UpdateUserDto): Promise<null|User> {
    if(updateUserDto.password)
      updateUserDto.password = await this.hashPassword(updateUserDto.password)

    let result
    result = await this.repository.findOneAndUpdate(filter, updateUserDto);
    if (!result) {
      throw new Error('not found '+helper.name)
    }
    return result
  }

  async remove(filter: string|object): Promise<null|User> {
    let result
    try {
      result = await this.repository.findOneAndRemove(filter);
    } catch (e) {
      throw new Error('not found '+helper.name)
    }
    return result
  }

  async hashPassword(password, saltRounds = 10): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
