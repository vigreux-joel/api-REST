import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


const port = process.env.PORT;


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();