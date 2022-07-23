
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {AppService} from "./app.service";
import {Module} from "@nestjs/common";
import {MongooseSchemasModule} from "./modules/mongoose-schemas/mongoose-schemas-module";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";
import {BlogModule} from "./modules/blog/blog.module";

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