import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, {Model, Types} from "mongoose";
import {User} from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import {UserRepository} from "./user.repository";

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<null|User> {
    createUserDto.createdAt = new Date()
    createUserDto.password = await this.hashPassword(createUserDto.password)

    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(filter: string|object): Promise<null|User> {

    if(filter instanceof mongoose.Types.ObjectId){
      filter = {'_id': filter}
    }
    else if(typeof filter  == 'string'){
      filter = {'_id': filter}
    }

    let result: User
    result = await this.usersRepository.findOne(filter);

    if (!result){
      throw new Error('not found user');
    }

    return result
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if(updateUserDto.password)
      updateUserDto.password = await this.hashPassword(updateUserDto.password)

    let result
    result = await this.usersRepository.findOneAndUpdate({'_id': id}, updateUserDto);
    if (!result) {
      throw ({message: 'not found user'})
    }
    return result
  }

  async remove(filter: string|object) {
    if(filter instanceof mongoose.Types.ObjectId){
      filter = {'_id': filter}
    }
    else if(typeof filter  == 'string'){
      filter = {'_id': filter}
    }
    let result
    try {
      result = await this.usersRepository.findOneAndRemove(filter);
    } catch (e) {
      throw ({message: 'invalid id'})
    }
    return result
  }

  async hashPassword(password, saltRounds = 10): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
