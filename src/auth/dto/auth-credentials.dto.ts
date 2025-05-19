import { IsNotEmpty, Length, Matches, MaxLength, MinLength } from "class-validator";
import { Unique } from "typeorm";

export class AuthCredentialsDTO{
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    userName:string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {message:"Password must contain atleast one uppercase one lowercase one number and a special character"})
    password:string;
}