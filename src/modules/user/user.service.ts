import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserEntity} from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import {UserRepository} from "./user.repository";
import {userHelper} from "./user.const";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<null|UserEntity> {
    createUserDto.createdAt = new Date()
    createUserDto.password = await this.hashPassword(createUserDto.password)

    return this.userRepository.create(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(filter: string|object): Promise<null|UserEntity> {
    let result: UserEntity
    result = await this.userRepository.findOne(filter);
    if (!result){
      throw new Error('not found '+userHelper.entityName);
    }
    return result
  }

  async update(filter: string|object, updateUserDto: UpdateUserDto): Promise<null|UserEntity> {
    if(updateUserDto.password)
      updateUserDto.password = await this.hashPassword(updateUserDto.password)

    let result
    result = await this.userRepository.findOneAndUpdate(filter, updateUserDto);
    if (!result) {
      throw new Error('not found '+userHelper.entityName)
    }
    return result
  }

  async remove(filter: string|object): Promise<null|UserEntity> {
    let result
    try {
      result = await this.userRepository.findOneAndRemove(filter);
    } catch (e) {
      throw new Error('not found '+userHelper.entityName)
    }
    return result
  }

  async hashPassword(password, saltRounds = 10): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
