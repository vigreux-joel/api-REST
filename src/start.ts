import './helper/extension'
import 'dotenv/config';
import {ClassSerializerInterceptor, INestApplication, ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {Reflector} from "@nestjs/core";

export async function appOption(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, transform: true }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const config = new DocumentBuilder()
        .setTitle(process.env.SITE_NAME)
        .setDescription('The '+process.env.SITE_NAME+' API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    return app
}