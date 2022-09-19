import {
  Controller,
  UseInterceptors
} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {RoleHelper} from "./role.helper";
import {RoleService} from "./role.service";
import {TransformInterceptor} from "../../utils/transform.interceptor";

@ApiTags((RoleHelper.entityName+'s').ucfirst())
@UseInterceptors(TransformInterceptor)
@Controller(RoleHelper.entityName)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Post()
  // @ApiTags('Auth')
  // @ApiOperation({summary: 'Create '+RoleHelper.entityName})
  // @ApiResponse({status: 201, type: RoleEntity})
  // async create(@Body() createRoleDto: CreateRoleDto) {
  //   try {
  //     return await this.roleService.create(createRoleDto);
  //   } catch (e) {
  //     throw new HttpException({
  //       error: e.message,
  //       code: e.code,
  //       keyValue: e.keyValue
  //     }, HttpStatus.FORBIDDEN);
  //   }
  // }

  // @Get()
  // @ApiOperation({summary: 'Get all ' + RoleHelper.entityName + 's'})
  // @ApiPaginatedResponse(RoleEntity)
  // async findAll(@Query() pageOptionsDto: PageOptionsDto, @Req() req) {
  //   let result = await this.roleService.findAll(pageOptionsDto);
  //   return result
  // }

  // @Get(':id')
  // @ApiOperation({summary: 'Get '+RoleHelper.entityName+' by id'})
  // @ApiEntityResponse(RoleEntity)
  // async findOne(@Param('id') id: string) {
  //   try {
  //     return await this.roleService.findOne(id);
  //   } catch (e) {
  //     throw new HttpException({
  //       error: e.message
  //     }, HttpStatus.NOT_FOUND);
  //   }
  // }

  // @Patch(':id')
  // @ApiOperation({summary: 'Update '+RoleHelper.entityName})
  // @ApiEntityResponse(RoleEntity)
  // async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   try {
  //     return await this.roleService.update(id, updateRoleDto);
  //   } catch (e) {
  //     throw new HttpException({
  //       error: e.message,
  //       keyValue: e.keyValue
  //     }, HttpStatus.FORBIDDEN);
  //   }
  // }

  // @Delete(':id')
  // @ApiOperation({summary: 'Delete '+RoleHelper.entityName})
  // @ApiResponse({status: 200, type: RoleEntity})
  // async remove(@Param('id') id: string) {
  //   try {
  //     return await this.roleService.remove(id);
  //   } catch (e) {
  //     throw new HttpException({
  //       error: e.message
  //     }, HttpStatus.NOT_FOUND);
  //   }
  // }
}
