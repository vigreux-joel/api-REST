import './helper/extension'
import 'dotenv/config';
import {INestApplication, ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

export async function appOption(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: false, transform: true }));

    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    return app
}