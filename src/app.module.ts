import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { BlogModule } from './blog/blog.module';
import {ConfigModule} from "@nestjs/config";
import {DashboardModule} from "./dashboard/dashboard.module";
import { MongooseSchemasModule } from './mongoose-schemas/mongoose-schemas-module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.MONGO_URL),
      BlogModule,
      DashboardModule,
      MongooseSchemasModule,
      UserModule,
      AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
