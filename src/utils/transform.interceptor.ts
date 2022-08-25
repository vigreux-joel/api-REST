import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {Model} from "mongoose";
import {PageDto} from "./api/dto/page.dto";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(response => {
            return this.transform(response)
        }));
    }

    transform(response) {
        if(response instanceof Array && response[0] instanceof Model){
            response = response.map(value => {
                if(value instanceof Model){
                    return value.toObject()
                }
            })
        }
        else if(response instanceof PageDto){
            response.items = response.items.map(value => {
                if(value instanceof Model){
                    return value.toObject()
                }
            })
        }
        else if(response instanceof Model){
            response = response.toObject()
        }
        return response
    }
}