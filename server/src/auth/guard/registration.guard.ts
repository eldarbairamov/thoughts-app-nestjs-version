import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../../user/model/user.model";
import { RegistrationDto } from "../dto/registration.dto";

@Injectable()
export class RegistrationGuard implements CanActivate {

  constructor( @InjectModel( UserModel ) private userModel: typeof UserModel ) {
  }

  async canActivate( context: ExecutionContext ): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const candidate = request.body as RegistrationDto;

    const [ email, username ] = await Promise.all( [
      this.userModel.findOne( { where: { email: candidate.email } } ),
      this.userModel.findOne( { where: { username: candidate.username } } )
    ] );

    if ( username ) throw new HttpException( "This username is already in use", HttpStatus.CONFLICT );
    if ( email ) throw new HttpException( "This email is already in user", HttpStatus.CONFLICT );

    return true
  }

}