import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { InjectModel } from "@nestjs/sequelize";
import { OAuthModel } from "../model/o-auth.model";

@Injectable()
export class AccessStrategy extends PassportStrategy( Strategy, "access" ) {

  constructor( @InjectModel( OAuthModel ) private oAuthModel: typeof OAuthModel ) {
    super( {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "accessTokenSecretKey",
      passReqToCallback: true
    } );
  }

  async validate( req: Request, decoded: { userId: string, email: string } ) {
    const accessToken = req.headers.authorization?.split( " " )[1];

    const isTokenExist = await this.oAuthModel.findOne( { where: { accessToken } } );
    if ( !isTokenExist ) throw new HttpException( "Invalid or expired token", HttpStatus.UNAUTHORIZED );

    const { userId } = decoded;
    return { userId, token: accessToken };
  }

}