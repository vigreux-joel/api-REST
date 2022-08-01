import {ApiEntityResponse} from "./api-entity.reponses";
import {Type} from "@nestjs/common";
import {PageDto} from "../dto/page.dto";

export const ApiPaginatedResponse = <TModel extends Type>(
    model: TModel
) => {
    return ApiEntityResponse([model], PageDto)
};
