import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDto } from "./page-meta.dto";

export class PageDto<T>{
    @ApiProperty()
    items: T[];

    @ApiProperty({ type: () => PageMetaDto })
    readonly meta: PageMetaDto;

    constructor(data: T[], meta: PageMetaDto) {
        this.items = data;
        this.meta = meta;
    }
}