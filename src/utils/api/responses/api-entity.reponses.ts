import {applyDecorators, Type} from "@nestjs/common";
import {ApiExtraModels, ApiOkResponse, getSchemaPath} from "@nestjs/swagger";

export const ApiEntityResponse = <TModel extends Type>(
    model: TModel|TModel[],
    ...options: any
) => {

    return applyDecorators(
        ApiExtraModels(...options),
        ApiOkResponse(
            (Array.isArray(model))?{
                description: "Get a paginated list of all "+model[0].name.replace('Entity', '').toLowerCase()+"s.",
                schema: {
                    allOf: getOption(model, options)
                },
            }: {
                description: "Retrieve a "+model.name.replace('Entity', '').toLowerCase()+'.',
                schema: {
                    allOf: getOption(model, options)
                }
            }
        )
    );
};

function getOption(model,options): Array<any>{
    const allOf = []
    if(options){
        options.forEach(option => {
            allOf.push({ $ref: getSchemaPath(option)})
        })
    }
    if(Array.isArray(model)){
        allOf.push({
            properties:
                (Array.isArray(model))? {
                    items:{
                        type: "array",
                        items: {
                            $ref: getSchemaPath(model[0])
                        },
                    }
                }: {$ref: getSchemaPath(model)}
        })
    } else {
        allOf.push({ $ref: getSchemaPath(model)})
    }
    
    return allOf
}


// import {applyDecorators, Type} from "@nestjs/common";
// import {ApiExtraModels, ApiOkResponse, getSchemaPath} from "@nestjs/swagger";
//
// export const ApiItemResponse = <TModel extends Type>(
//     model: TModel|TModel[],
//     ...options: any
// ) => {
//     const allOf = []
//     if(options){
//         options.forEach(option => {
//             allOf.push({ $ref: getSchemaPath(option)})
//         })
//     }
//     allOf.push({
//         properties: {
//             items:
//                 (Array.isArray(model))? {
//                     type: "array",
//                     items: {
//                         $ref: getSchemaPath(model[0])
//                     },
//                 }: {$ref: getSchemaPath(model)}
//         }
//     })
//
//     return applyDecorators(
//         ApiExtraModels(...options),
//         ApiOkResponse({
//             description: "Successfully received model list",
//             schema: {
//                 allOf: allOf
//             },
//         })
//     );
// };