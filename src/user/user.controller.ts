import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "./entities/user.entity";

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiTags('Auth')
  @ApiOperation({summary: 'Create user'})
  @ApiResponse({type: UserEntity})
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (e) {
      throw new HttpException({
        error: e.message,
        keyValue: e.keyValue
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @ApiOperation({summary: 'Get all users'})
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get user by id'})
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (e) {
      throw new HttpException({
        error: e.message
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update user'})
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (e) {
      throw new HttpException({
        error: e.message,
        keyValue: e.keyValue
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete user'})
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(id);
    } catch (e) {
      throw new HttpException({
        error: e.message
      }, HttpStatus.NOT_FOUND);
    }
  }
}
