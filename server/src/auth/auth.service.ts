import { Injectable } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration.dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../user/model/user.model";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { OAuthModel } from "./model/o-auth.model";

@Injectable()
export class AuthService {

  constructor(
    @InjectModel( UserModel ) private userModel: typeof UserModel,
    @InjectModel( OAuthModel ) private oAuthModel: typeof OAuthModel,
    private jwtService: JwtService ) {
  }

  async registration( dto: RegistrationDto ): Promise<void> {
    await this.userModel.create( { ...dto } );
  }

  async login( user: UserModel ): Promise<ITokenPair> {
    const tokenPair = {
      accessToken: this.jwtService.sign( { userId: user.id, email: user.email }, { secret: "accessTokenSecretKey", expiresIn: "30s" } ),
      refreshToken: this.jwtService.sign( { userId: user.id, email: user.email }, { secret: "refreshTokenSecretKey", expiresIn: "7d" } )
    };

    await this.oAuthModel.create( { ...tokenPair, ownerId: user.id } );

    return { ...tokenPair, username: user.username };
  }

  async logout( accessToken: string ): Promise<void> {
    await this.oAuthModel.destroy( { where: { accessToken } } );
  }

  async refresh( userId: number, email: string, refreshToken: string ): Promise<ITokenPair> {
    const tokenPair = {
      accessToken: this.jwtService.sign( { userId, email }, { secret: "accessTokenSecretKey", expiresIn: "1d" } ),
      refreshToken: this.jwtService.sign( { userId, email }, { secret: "refreshTokenSecretKey", expiresIn: "7d" } )
    };

    await this.oAuthModel.destroy( { where: { refreshToken } } );
    await this.oAuthModel.create( { ownerId: userId, ...tokenPair } );

    return tokenPair;
  }

  async validateUser( email: string, password: string ): Promise<UserModel> {
    const user = await this.userModel.findOne( { where: { email } } );

    const isPasswordValid = user ? await bcrypt.compare( password, user.password ) : null;

    if ( !user || !isPasswordValid ) throw null;

    return user;
  }

}