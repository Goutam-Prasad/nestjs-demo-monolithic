import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UserRepository,
        private readonly JWTService: JwtService) { }

    async signUp(createUserDTO:AuthCredentialsDTO):Promise<void>{
        return await this.usersRepository.createUser(createUserDTO);
    }

    async signIn(signInUserDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
        console.log({signInUserDTO})
        const response = await this.usersRepository.signIn(signInUserDTO);
        if (response) {
            const payload: JwtPayload = { userName: signInUserDTO.userName };
            const token: string = this.JWTService.sign(payload);
            return { accessToken: token };
        }
    }
}
