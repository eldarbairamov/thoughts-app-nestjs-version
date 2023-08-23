import { Body, Controller, Delete, Post, Req, UseGuards } from "@nestjs/common";
import { RegistrationGuard } from "./guard/registration.guard";
import { RegistrationDto } from "./dto/registration.dto";
import { AuthService } from "./auth.service";
import { LoginGuard } from "./guard/login.guard";
import { Request } from "express";
import { UserModel } from "../user/model/user.model";
import { AccessGuard } from "./guard/access.guard";
import { User } from "../common/decorator/user.decorator";
import { RefreshGuard } from "./guard/refresh.guard";

@Controller( { path: "auth" } )
export class AuthController {

  constructor( private authService: AuthService ) {
  }

  @UseGuards( RegistrationGuard )
  @Post( "registration" )
  async registration(
    @Body() dto: RegistrationDto ): Promise<{ message: string }> {

    await this.authService.registration( dto );
    return { message: "Success" };
  }

  @UseGuards( LoginGuard )
  @Post( "login" )
  async login(
    @Req() request: Request & { user: UserModel } ): Promise<ISuccessLogin> {

    return this.authService.login( request.user );
  }

  @UseGuards( AccessGuard )
  @Delete( "logout" )
  async logout(
    @User( "token" ) token: string ): Promise<{ message: string }> {

    await this.authService.logout( token );
    return { message: "Success" };
  }

  @UseGuards( RefreshGuard )
  @Post( "refresh" )
  async refresh(
    @User() data: { userId: number, email: string, refreshToken: string } ): Promise<ISuccessLogin> {

    return this.authService.refresh( data.userId, data.email, data.refreshToken );
  }

}