import {ApiDataResponse} from "./api-data.reponses";
import {Type} from "@nestjs/common";
import {PageDto} from "../dto/page.dto";

export const ApiPaginatedResponse = <TModel extends Type>(
    model: TModel
) => {
    return ApiDataResponse([model], PageDto)
};
