import { Module } from "@nestjs/common";
import { ThoughtModule } from "./thought/thought.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "./user/model/user.model";
import { ThoughtModel } from "./thought/model/thought.model";

@Module( {
  imports: [
    ThoughtModule,
    AuthModule,
    UserModule,
    SequelizeModule.forRoot( {
      dialect: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "eldar010596",
      database: "thoughts",
      models: [ UserModel, ThoughtModel ],
      logging: false,
      autoLoadModels: true,
    } )
  ]
} )
export class AppModule {

}