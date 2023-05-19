import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('DMCLab')
  .setDescription('API for FrontEnd Application')
  .setVersion('1.0')
  .addTag('API')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors()
  SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}
bootstrap();
