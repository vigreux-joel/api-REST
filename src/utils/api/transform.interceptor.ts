import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {instanceToPlain} from "class-transformer";
import {Model} from "mongoose";
import {PageDto} from "./dto/page.dto";
@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(response => {
            let result = this.transform(response)
            return instanceToPlain(result)
        }));
    }

    transform(response) {
        if(response instanceof PageDto){
            response.items = response.items.map(value => {
                if(value instanceof Model){
                    return value.toObject()
                }
            })
        }
        if(response instanceof Model){
            response = response.toObject()
        }
        return response
    }
}