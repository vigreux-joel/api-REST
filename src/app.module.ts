import {Module} from "@nestjs/common";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";
import {DatabaseModule} from "./modules/database/database.module";
import {RoleService} from "./modules/role/role.service";
import {RoleModule} from "./modules/role/role.module";
import {EventEmitterModule} from "@nestjs/event-emitter";

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        AuthModule,
        RoleModule,
        EventEmitterModule.forRoot()
    ],
})
export class AppModule {}