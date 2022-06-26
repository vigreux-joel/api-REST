import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
    @Prop()
    firstName: string;

    @Prop()
    lastName: number;
}

export const AdminSchema = SchemaFactory.createForClass(Blog);