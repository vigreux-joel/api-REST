import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {BlogModule} from "./blog/blog.module";
import {MongooseSchemasModule} from "./mongoose-schemas/mongoose-schemas-module";
import {UserModule} from "./user/user.module";
import {AppService} from "./app.service";
import {Module} from "@nestjs/common";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URL),
        BlogModule,
        MongooseSchemasModule,
        UserModule,
        AuthModule,
    ],
    providers: [AppService],
})
export class AppModule {}