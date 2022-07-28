import { ApiProperty } from "@nestjs/swagger";
import {PageOptionsDto} from "./page-option.dto";

export type PageMetaDtoParameters = {
    pageOptionsDto: PageOptionsDto;
    totalItems: number;
}

export class PageMetaDto implements PageOptionsDto{
    @ApiProperty({example: 1})
    readonly page: number;

    @ApiProperty({example: 10})
    readonly limit: number;

    @ApiProperty({example: 1})
    readonly totalItems: number;

    @ApiProperty({example: 1})
    readonly totalPage: number;

    @ApiProperty({example: false})
    readonly hasPreviousPage: boolean;

    @ApiProperty({example: false})
    readonly hasNextPage: boolean;

    constructor({pageOptionsDto, totalItems }: PageMetaDtoParameters) {
        this.page = pageOptionsDto.page;
        this.limit = pageOptionsDto.limit;
        this.totalItems = totalItems;
        this.totalPage = Math.ceil(this.totalItems / this.limit);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.totalPage;
    }

    get skip(): number {
        return 0;
    }
}