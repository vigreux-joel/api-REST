import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
    @Prop()
    title: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    Author

    @Prop()
    contents: string;

    @Prop({
        type: Date,
    })
    publishedAt
}

export const BlogSchema = SchemaFactory.createForClass(Blog);