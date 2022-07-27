import {applyDecorators, Type} from "@nestjs/common";
import {ApiExtraModels, ApiOkResponse, getSchemaPath} from "@nestjs/swagger";

export const ApiDataResponse = <TModel extends Type>(
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
        ApiExtraModels(...options),
        ApiOkResponse({
            description: "Successfully received model list",
            schema: {
                allOf: allOf
            },
        })
    );
};