import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthRessponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor (private readonly authService : AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(
        @Body('userName') userName : string,
        @Body('password') passsword : string
    ): AuthRessponseDto{
        return this.authService.signIn(userName, passsword);
    }
}
