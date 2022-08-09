import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors, Req, ClassSerializerInterceptor, UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserHelper} from "./user.helper";
import {UserService} from "./user.service";
import {ApiEntityResponse} from "../../utils/api/responses/api-entity.reponses";
import {ApiPaginatedResponse} from "../../utils/api/responses/api-paginated.response";
import {PageOptionsDto} from "../../utils/api/dto/page-option.dto";
import {TransformInterceptor} from "../../utils/api/transform.interceptor";
import {RoleService} from "../role/role.service";
import {ReadUserDto} from "./dto/read-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags((UserHelper.entityName+'s').ucfirst())
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(UserHelper.entityName)
export class UserController {
  constructor(private readonly userService: UserService, private readonly roleService: RoleService) {
    this.createRole()
  }
  async createRole(){
    // let admin ={
    //   default: true,
    //   permissions: [
    //     'user.*'
    //   ]
    // }
    // let self ={
    //   default: true,
    //   permissions: [
    //     'user.read.*',
    //     'user.write.*',
    //     'user.update.*',
    //   ]
    // }
    // // let default ={
    // //   name: 'default',
    // //   default: true,
    // //   permissions: [
    // //     'user.read.firstname',
    // //     'user.read.lastname',
    // //   ]
    // // }

    const userAdmin = await this.roleService.registerPermission('user.*', 'allows to manage all')
    const userReadAll = await this.roleService.registerPermission('user.read.*', 'allows to read all')
    const userWriteAll = await this.roleService.registerPermission('user.write.*', 'allows to write all')
    const userUpdateAll = await this.roleService.registerPermission('user.update.*', 'allows to update all')
    const userReadFirstName = await this.roleService.registerPermission('user.read.firstname', 'allows to read the firstname')
    const userReadLastName = await this.roleService.registerPermission('user.read.lastname', 'allows to read the lastname')

    this.roleService.registerRole('default', [userReadFirstName,userReadLastName])
    this.roleService.registerRole('self', [userWriteAll,userReadAll,userUpdateAll])
    this.roleService.registerRole('admin', [userAdmin])


  }

  @Post()
  @ApiTags('Auth')
  @ApiOperation({summary: 'Create '+UserHelper.entityName})
  @ApiResponse({status: 201, type: ReadUserDto})
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (e) {
      throw new HttpException({
        error: e.message,
        code: e.code,
        keyValue: e.keyValue
      }, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Get all ' + UserHelper.entityName + 's'})
  @ApiPaginatedResponse(ReadUserDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Req() req) {
    let userTest = await this.userService.findOne('62f14c5277a43af0c78a1751')
    console.log(userTest)
    return await this.userService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get '+UserHelper.entityName+' by id'})
  @ApiEntityResponse(ReadUserDto)
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
  @ApiOperation({summary: 'Update '+UserHelper.entityName})
  @ApiEntityResponse(ReadUserDto)
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
  @ApiOperation({summary: 'Delete '+UserHelper.entityName})
  @ApiResponse({status: 200, type: ReadUserDto})
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
