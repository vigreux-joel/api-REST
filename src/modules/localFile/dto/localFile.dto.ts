import {AbstractEntity} from "../../../utils/abstract.entity"
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {LocalFileInterface} from "../interfaces/localFile.interface";

export class LocalFileDto extends AbstractEntity implements LocalFileInterface{

    @ApiProperty({ example: 'ersgserhgzesrthgesrthz'})
    filename: string;

    @ApiProperty({ example: '/avatars'})
    path: string;

    @ApiProperty({ example: 'image/png'})
    mimetype: string;

}
