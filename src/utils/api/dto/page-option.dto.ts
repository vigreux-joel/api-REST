import { ApiPropertyOptional } from "@nestjs/swagger";
import {IsEnum, IsInt, IsOptional, Max, Min} from "class-validator";
import {Type} from "class-transformer";

export enum Order {
    ASC = "ASC",
    DESC = "DESC",
}

export class PageOptionsDto {
    @ApiPropertyOptional({ enum: Order, default: Order.ASC })
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC;

    @Type(() => Number)
    @ApiPropertyOptional({
        minimum: 1,
        default: 1,
    })
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @Type(() => Number)
    @ApiPropertyOptional({
        minimum: 1,
        maximum: 50,
        default: 10,
    })
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly limit?: number = 10;

    get skip(): number {
        return (this.page - 1) * this.limit;
    }
}