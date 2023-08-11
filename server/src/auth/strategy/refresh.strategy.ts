import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectModel } from "@nestjs/sequelize";
import { OAuthModel } from "../model/o-auth.model";
import { Request } from "express";

@Injectable()
export class RefreshStrategy extends PassportStrategy( Strategy, "refresh" ) {

  constructor( @InjectModel( OAuthModel ) private oAuthModel: typeof OAuthModel ) {
    super( {
      jwtFromRequest: ExtractJwt.fromBodyField( "refreshToken" ),
      ignoreExpiration: false,
      secretOrKey: "refreshTokenSecretKey",
      passReqToCallback: true
    } );
  }

  async validate( req: Request & { refreshToken: string }, decoded: { userId: string, email: string } ) {
    const { refreshToken } = req.body;

    const isTokenExist = await this.oAuthModel.findOne( { where: { refreshToken } } );
    if ( !isTokenExist ) throw new HttpException( "Invalid or expired token", HttpStatus.UNAUTHORIZED );

    return { ...decoded, refreshToken };
  }

}