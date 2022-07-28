import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {instanceToPlain} from "class-transformer";
import {UserEntity} from "../../modules/user/entities/user.entity";
import {Model} from "mongoose";
@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(response => {
            return instanceToPlain(this.transform(response))
        }));
    }

    transform(response) {
        return Object.values(response).map((value)=>{
            if(value instanceof Model){
                return value.toObject()
            }
            if(Array.isArray(value)){
                return value.map(value => value.toObject())
            }
            return value
        })
    }
}