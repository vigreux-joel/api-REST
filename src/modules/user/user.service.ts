import {Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserEntity} from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import {UserHelper} from "./user.helper";
import {PageOptionsDto} from "../../utils/api/dto/page-option.dto";
import {UserRepository} from "./repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    createUserDto.password = await this.hashPassword(createUserDto.password)
    return this.userRepository.create(createUserDto, (query) => query.populate('roles'));
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    return this.userRepository.findPaginated(null,pageOptionsDto,(query) => query.populate('roles'))
  }

  async findOne(filter: string|object): Promise<UserEntity> {
    let result: UserEntity
    result = await this.userRepository.findOne(filter,(query) => query.populate('roles'))
    if (!result){
      throw new Error('not found '+UserHelper.entityName);
    }
    return result
  }

  async update(filter: string|object, updateUserDto: UpdateUserDto): Promise<null|UserEntity> {
    if(updateUserDto.password)
      updateUserDto.password = await this.hashPassword(updateUserDto.password)

    let result
    result = await this.userRepository.findOneAndUpdate(filter, updateUserDto,(query) => query.populate('roles'));
    if (!result) {
      throw new Error('not found '+UserHelper.entityName)
    }
    return result
  }

  async remove(filter: string|object): Promise<null|UserEntity> {
    let result
    try {
      result = await this.userRepository.findOneAndRemove(filter,(query) => query.populate('roles'));
    } catch (e) {
      throw new Error('not found '+UserHelper.entityName)
    }
    return result
  }

  async hashPassword(password, saltRounds = 10): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
}