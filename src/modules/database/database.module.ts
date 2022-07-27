
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {Module} from "@nestjs/common";
import * as mongoose from 'mongoose';

mongoose.set('returnOriginal', false);

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URL),
    ]
})
export class DatabaseModule {}