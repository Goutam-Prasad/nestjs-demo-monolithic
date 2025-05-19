import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository:UserRepository){}

    async signUp(createUserDTO:AuthCredentialsDTO):Promise<void>{
        return await this.usersRepository.createUser(createUserDTO);
    }

    async signIn(signInUserDTO:AuthCredentialsDTO):Promise<string>{
        console.log({signInUserDTO})
        return await this.usersRepository.signIn(signInUserDTO);
    }
}
