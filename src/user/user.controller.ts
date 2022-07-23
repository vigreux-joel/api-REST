import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./entities/user.entity";

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiTags('Auth')
  @ApiOperation({summary: 'Create user'})
  @ApiResponse({status: 201, type: User})
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
  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({status: 200, type: [User]})
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get user by id'})
  @ApiResponse({status: 200, type: User})
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
  @ApiOperation({summary: 'Update user'})
  @ApiResponse({status: 200, type: User})
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
  @ApiOperation({summary: 'Delete user'})
  @ApiResponse({status: 200, type: User})
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
