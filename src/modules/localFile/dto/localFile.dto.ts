import {AbstractEntity} from "../../../utils/api/AbstractEntity";
import {UserInterface} from "../../user/interfaces/user.interface";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {LocalFile} from "../entities/localFile.entity";
import {RoleEntity} from "../../role/entities/role.entity";
import {LocalFileInterface} from "../interfaces/localFile.interface";

export class LocalFileDto extends AbstractEntity implements LocalFileInterface{

    @ApiProperty({ example: 'ersgserhgzesrthgesrthz'})
    filename: string;

    @ApiProperty({ example: '/avatars'})
    path: string;

    @ApiProperty({ example: 'image/png'})
    mimetype: string;

}
