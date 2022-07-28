import {ApiProperty} from "@nestjs/swagger";

export class DataResponseDto<T> {
    @ApiProperty()
    readonly items: T|T[];

    constructor(data: T|T[]) {
        this.items = data;
    }
}