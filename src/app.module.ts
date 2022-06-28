import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { BlogModule } from './blog/blog.module';
import {ConfigModule} from "@nestjs/config";
import {DashboardModule} from "./dashboard/dashboard.module";
import { MongooseSchemasModule } from './mongoose-schemas/mongoose-schemas-module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.MONGO_URL),
      BlogModule,
      DashboardModule,
      MongooseSchemasModule,
      UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
