import {ApiProperty} from "@nestjs/swagger";

export class DataResponseDto<T> {
    @ApiProperty()
    readonly data: T|T[];

    constructor(data: T|T[]) {
        this.data = data;
    }
}