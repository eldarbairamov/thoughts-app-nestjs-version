import { ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LoginGuard extends AuthGuard( "login" ) {

   canActivate( context: ExecutionContext ): any {
      return super.canActivate( context );
   }

   handleRequest( err, data ) {
      if ( err || !data ) throw new HttpException( "Wrong email or password", HttpStatus.UNAUTHORIZED );
      return data;
   }

}