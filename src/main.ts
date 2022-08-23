import {appOption} from "./start";
import {NestFactory} from '@nestjs/core';
import {Logger} from "@nestjs/common";
import {AppModule} from "./app.module";

const port = process.env.PORT;

async function bootstrap() {

  const app = await NestFactory.create(AppModule)

  await appOption(app)

  await app.listen(port)
  Logger.log(`Server started running on http://localhost:${port}/api`, 'Bootstrap')
}

bootstrap()