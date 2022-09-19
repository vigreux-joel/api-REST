import {AbstractEntity} from "../../../utils/abstract.entity";
import {IsOptional} from "class-validator";
import {LocalFileInterface} from "../interfaces/localFile.interface";
import {ApiProperty} from "@nestjs/swagger";

export class LocalFileEntity extends AbstractEntity implements LocalFileInterface {

    @ApiProperty({example: "azertyuiopmlkjhgfdsqwxcvbn"})
    filename: string;

    @ApiProperty({example: "/avatars"})
    path: string;

    @ApiProperty({example: "image/png"})
    mimetype: string;
}

