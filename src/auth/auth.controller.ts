import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('/signup')
    singUp(@Body() authCredentialsDTO:AuthCredentialsDTO):Promise<void>{
     return this.authService.signUp(authCredentialsDTO);
    }
    @Post('/signin')
    signIn(@Body() authCredentialsDTO:AuthCredentialsDTO):Promise<string>{
     return this.authService.signIn(authCredentialsDTO);
    }
}
