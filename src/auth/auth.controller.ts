import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('/signup')
    singUp(@Body() authCredentialsDTO:AuthCredentialsDTO):Promise<void>{
     return this.authService.signUp(authCredentialsDTO);
    }
    @Post('/signin')
    signIn(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDTO);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req): void {
        console.log({ req })
    }
}
