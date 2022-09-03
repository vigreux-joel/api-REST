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
  ClassSerializerInterceptor,
  UseGuards,
  UploadedFiles,
  UploadedFile,
  PipeTransform,
  ArgumentMetadata, ParseUUIDPipe, ParseBoolPipe, ParseArrayPipe
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserHelper} from "./user.helper";
import {UserService} from "./user.service";
import {ApiEntityResponse} from "../../utils/api/responses/api-entity.reponses";
import {ApiPaginatedResponse} from "../../utils/api/responses/api-paginated.response";
import {PageOptionsDto} from "../../utils/api/dto/page-option.dto";
import {TransformInterceptor} from "../../utils/api/transform.interceptor";
import {RoleService} from "../role/role.service";
import {ReadUserDto} from "./dto/read-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UserEntity} from "./entities/user.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {createStore} from "adminjs";

@ApiTags((UserHelper.entityName+'s').ucfirst())
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@Controller(UserHelper.entityName)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploadedFiles/avatars'
    }),
    fileFilter: (req, file, callback) =>{
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)){
        return callback(new Error("Only image file are allowed"), false)
      }
      if (file.size > 512) {
        return callback(new Error("file is to big"), false)
      }
      callback(null,true)
    }
  }))
  @ApiTags('Auth')
  @ApiOperation({summary: 'Create '+UserHelper.entityName})
  @ApiResponse({status: 201, type: ReadUserDto})
  @ApiConsumes('application/json', "multipart/form-data")
  async create(
      @Body() createUserDto: CreateUserDto,
      @UploadedFile() file: Express.Multer.File): Promise<ReadUserDto> {
    try {
      // createUserDto.avatar = { path: "/avatars", mimetype: file.mimetype, filename: file.originalname }
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

    // let userTest: UserEntity = await this.userService.findOne('6304f56fc31bf25db08e55d1')
    // console.log(userTest)
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
