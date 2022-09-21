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
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserHelper} from "./user.helper";
import {UserService} from "./user.service";
import {ApiEntityResponse} from "../../utils/api/responses/api-entity.reponses";
import {ApiPaginatedResponse} from "../../utils/api/responses/api-paginated.response";
import {PageOptionsDto} from "../../utils/api/dto/page-option.dto";
import {TransformInterceptor} from "../../utils/transform.interceptor";
import {ReadUserDto} from "./dto/read-user.dto";
import {FileSystemStoredFile, FormDataRequest} from "nestjs-form-data";
import {CreateUserDto} from "./dto/create-user.dto";

@ApiTags((UserHelper.entityName+'s').ucfirst())
@UseInterceptors(TransformInterceptor)
@Controller(UserHelper.entityName)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @ApiTags('Auth')
  @ApiOperation({summary: 'Create '+UserHelper.entityName})
  @ApiResponse({status: 201, type: ReadUserDto})
  @ApiConsumes('application/json', "multipart/form-data")
  @FormDataRequest({
    storage: FileSystemStoredFile,
    autoDeleteFile: false,
    fileSystemStoragePath: "./uploadedFiles/avatars",
    limits: {
      fileSize: 512000,
      files: 1,
    }
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    console.log(createUserDto)
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
  @ApiOperation({summary: 'Get all ' + UserHelper.entityName + 's'})
  @ApiPaginatedResponse(ReadUserDto)
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Req() req) {
    return await this.userService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get '+UserHelper.entityName+' by id'})
  @ApiEntityResponse(ReadUserDto)
  async findOne(@Param('id') id: string): Promise<ReadUserDto> {
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
