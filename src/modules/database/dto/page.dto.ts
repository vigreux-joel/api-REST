import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageMetaDto } from "./page-meta.dto";
import {DataResponseDto} from "./data-response.dto";

export class PageDto<T> extends DataResponseDto<T>{
    @ApiProperty({ type: () => PageMetaDto })
    readonly meta: PageMetaDto;

    constructor(data: T[], meta: PageMetaDto) {
        super(data);
        this.meta = meta;
    }
}