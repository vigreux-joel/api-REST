import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import {PageDto} from "../dto/page.dto";
import {DataResponseDto} from "../dto/data-response.dto";
import {UserEntity} from "../../user/entities/user.entity";

export const ApiPaginatedResponse = <TModel extends Type<any>>(
    model: TModel
) => {
    return ApiDataResponse([model], PageDto)
};

export const ApiDataResponse = <TModel extends Type<any>>(
    model: TModel|TModel[],
    ...options: any
) => {
    const allOf = []
    if(options){
        options.forEach(option => {
            allOf.push({ $ref: getSchemaPath(option)})
        })
    }
    allOf.push({
        properties: {
            data:
                (Array.isArray(model))? {
                    type: "array",
                    items: {
                        $ref: getSchemaPath(model[0])
                    },
                }: {$ref: getSchemaPath(model)}
        }
    })

    return applyDecorators(
        ApiExtraModels(PageDto),
        ApiOkResponse({
            description: "Successfully received model list",
            schema: {
                allOf: allOf
            },
        })
    );
};

// export const ApiDataResponse = <TModel extends Type<any>>(
//     model: TModel|[TModel],
// ) => {
//     return applyDecorators(
//         ApiExtraModels(PageDto),
//         ApiOkResponse({
//             description: "Successfully received model list",
//             schema: {
//                 allOf:
//                     (Array.isArray(model))?
//                         [
//                             { $ref: getSchemaPath(PageDto)},
//                             {
//                                 properties: {
//                                     data:
//                                         {
//                                             type: "array",
//                                             items: {
//                                                 $ref: getSchemaPath(model[0])
//                                             },
//                                         }
//                                 }
//                             },
//                         ]
//                         :
//                         [
//                             {
//                                 properties: {
//                                     data:
//                                         {$ref: getSchemaPath(model)}
//                                 }
//                             },
//                         ]
//
//             },
//         })
//     );
// };