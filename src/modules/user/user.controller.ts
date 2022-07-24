import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "./entities/user.entity";
import {userHelper} from "./user.const";

@ApiTags((userHelper.entityName+'s').ucfirst())
@Controller(userHelper.entityName)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiTags('Auth')
  @ApiOperation({summary: 'Create '+userHelper.entityName})
  @ApiResponse({status: 201, type: UserEntity})
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.service.create(createUserDto);
    } catch (e) {
      throw new HttpException({
        error: e.message,
        code: e.code,
        keyValue: e.keyValue
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @ApiOperation({summary: 'Get all '+userHelper.entityName+'s'})
  @ApiResponse({status: 200, type: [UserEntity]})
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get '+userHelper.entityName+' by id'})
  @ApiResponse({status: 200, type: UserEntity})
  async findOne(@Param('id') id: string) {
    try {
      return await this.service.findOne(id);
    } catch (e) {
      throw new HttpException({
        error: e.message
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update '+userHelper.entityName})
  @ApiResponse({status: 200, type: UserEntity})
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.service.update(id, updateUserDto);
    } catch (e) {
      throw new HttpException({
        error: e.message,
        keyValue: e.keyValue
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete '+userHelper.entityName})
  @ApiResponse({status: 200, type: UserEntity})
  async remove(@Param('id') id: string) {
    try {
      return await this.service.remove(id);
    } catch (e) {
      throw new HttpException({
        error: e.message
      }, HttpStatus.NOT_FOUND);
    }
  }
}
