import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./entities/user.entity";

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiTags('Auth')
  @ApiOperation({summary: 'Create user'})
  @ApiResponse({status: 201, type: User})
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (e) {
      throw new HttpException({
        error: e.message,
        keyValue: e.keyValue
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({status: 200, type: [User]})
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get user by id'})
  @ApiResponse({status: 200, type: User})
  async getUser(@Param('id') id: string) {
    try {
      return await this.userService.getUser(id);
    } catch (e) {
      throw new HttpException({
        error: e.message
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update user'})
  @ApiResponse({status: 200, type: User})
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.updateUser(id, updateUserDto);
    } catch (e) {
      throw new HttpException({
        error: e.message,
        keyValue: e.keyValue
      }, HttpStatus.FORBIDDEN);
    }
  }

  // @Delete(':id')
  // @ApiOperation({summary: 'Delete user'})
  // @ApiResponse({status: 200, type: User})
  // async remove(@Param('id') id: string) {
  //   try {
  //     return await this.userService.remove(id);
  //   } catch (e) {
  //     throw new HttpException({
  //       error: e.message
  //     }, HttpStatus.NOT_FOUND);
  //   }
  // }
}
