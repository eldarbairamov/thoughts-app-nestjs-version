import { Module } from "@nestjs/common";
import { ThoughtModule } from "./thought/thought.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import config from "./config";
import { dbConfig } from "./config/db-config";

@Module( {
   imports: [
      ThoughtModule,
      AuthModule,
      UserModule,
      SequelizeModule.forRoot( dbConfig ),
      ConfigModule.forRoot( {
         isGlobal: true,
         load: [ config ],
      } )
   ]
} )
export class AppModule {

}