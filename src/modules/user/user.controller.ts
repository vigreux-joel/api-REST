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
  UseInterceptors, UseGuards, Req, ClassSerializerInterceptor
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "./entities/user.entity";
import {UserHelper} from "./user.helper";
import {UserService} from "./user.service";
import {ApiEntityResponse} from "../../utils/api/responses/api-entity.reponses";
import {ApiPaginatedResponse} from "../../utils/api/responses/api-paginated.response";
import {PageOptionsDto} from "../../utils/api/dto/page-option.dto";
import {TransformInterceptor} from "../../utils/api/transform.interceptor";
import {LocalAuthGuard} from "../auth/guards/local-auth.guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RoleService} from "../role/role.service";
import {PermissionEntity} from "../role/entities/permission.entity";
import {CreateRoleDto} from "../role/dto/create-role.dto";

@ApiTags((UserHelper.entityName+'s').ucfirst())
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(UserHelper.entityName)
export class UserController {
  constructor(private readonly userService: UserService, private readonly roleService: RoleService) {
    this.roleService.registerDefaultPermission('user.*', 'ceci est un descfdfripgtion')
  }

  @Post()
  @ApiTags('Auth')
  @ApiOperation({summary: 'Create '+UserHelper.entityName})
  @ApiResponse({status: 201, type: UserEntity})
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
  @ApiPaginatedResponse(UserEntity)
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Req() req) {
    return await this.userService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get '+UserHelper.entityName+' by id'})
  @ApiEntityResponse(UserEntity)
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
  @ApiEntityResponse(UserEntity)
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
  @ApiResponse({status: 200, type: UserEntity})
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
