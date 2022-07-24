
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {Module} from "@nestjs/common";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URL),
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}