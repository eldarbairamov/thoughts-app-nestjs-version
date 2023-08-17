import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { OAuthModel } from "./model/o-auth.model";
import { UserModel } from "../user/model/user.model";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { LoginStrategy } from "./strategy/login.strategy";
import { AccessStrategy } from "./strategy/access.strategy";
import { RefreshStrategy } from "./strategy/refresh.strategy";
import { ConfigModule } from "@nestjs/config";

@Module( {
   providers: [ AuthService, LoginStrategy, AccessStrategy, RefreshStrategy ],
   controllers: [ AuthController ],
   imports: [
      SequelizeModule.forFeature( [ OAuthModel, UserModel ] ),
      PassportModule,
      JwtModule.register( {} ),
      ConfigModule
   ]
} )
export class AuthModule {

}