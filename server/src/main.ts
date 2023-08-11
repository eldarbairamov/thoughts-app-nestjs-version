import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

export const start = async () => {
  const app = await NestFactory.create<NestExpressApplication>( AppModule );

  app.enableCors( { origin: "*" } );

  app.useGlobalPipes( new ValidationPipe( { transform: true, transformOptions: { enableImplicitConversion: true } } ) );

  await app.listen( 5300 );
};

start().then( () => console.log( "Server is started on port 5300" ) );
