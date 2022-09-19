import {Module} from "@nestjs/common";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";
import {DatabaseModule} from "./modules/database/database.module";
import {RoleModule} from "./modules/role/role.module";
import {EventEmitterModule} from "@nestjs/event-emitter";

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        RoleModule,
        DatabaseModule,
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}