import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { BlogModule } from './blog/blog.module';
import {ConfigModule} from "@nestjs/config";
import {AdminModule} from "./admin/admin.module";
import { MongooseSchemasModule } from './mongoose-schemas/mongoose-schemas-module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.MONGO_URL),
      BlogModule,
      AdminModule,
      MongooseSchemasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
