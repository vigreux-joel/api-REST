import {Prop, Schema} from "@nestjs/mongoose";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {AbstractEntity} from "../../database/AbstractEntity";
import {classToPlain, Exclude, instanceToPlain} from "class-transformer";
import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";

@Schema({
    toObject: {
        transform: function(doc, ret, options) {
            Object.setPrototypeOf(ret, Object.getPrototypeOf(new UserEntity()));
        }
    },
})
export class UserEntity extends AbstractEntity{

    @Prop({
        required: true,
    })
    @ApiProperty({ example: 'john'})
    firstname: string;

    @Prop({
        required: true,
    })
    @ApiProperty({ example: 'snow'})
    lastname: string;

    @Prop({
        required: true,
        unique: true,
    })
    @ApiProperty({ example: '+33100000000'})
    email: string;

    @Prop({
    })
    avatar: string;

    @Prop({
    })
    @ApiPropertyOptional({ example: '+33100000000'})
    tel: string;

    @Prop({
        required: true,
        minLength: 8,
        // select: false
    })
    @ApiProperty({ example: 'passwordExample'})
    @Exclude({ toPlainOnly: true })
    password: string;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(data => {
            return instanceToPlain(this.transform(data))
        }));
    }

    transform(data) {
        data.data =  Array.isArray(data.data) ? data.data.map(obj => obj.toObject()) : data.data.toObject();
        return data
    }
}