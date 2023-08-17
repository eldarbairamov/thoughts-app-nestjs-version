import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import config from './config/index'

export const start = async () => {
  const app = await NestFactory.create<NestExpressApplication>( AppModule );

  app.enableCors( { origin: "*" } );

  app.useGlobalPipes( new ValidationPipe( { transform: true, transformOptions: { enableImplicitConversion: true } } ) );

  await app.listen( config().PORT );
};

start().then( () => console.log( `Server is started on port ${config().PORT}` ) );
