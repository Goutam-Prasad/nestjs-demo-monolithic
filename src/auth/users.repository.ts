import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserRepository extends Repository<User>{
      constructor(private readonly dataSource: DataSource) {
            super(User, dataSource.createEntityManager());
        }

        async createUser(createUserDTO:AuthCredentialsDTO):Promise<void>{
            try{
            const{ userName,password}=createUserDTO;
const salt=await bcrypt.genSalt();
const hash=await bcrypt.hash(password,salt);
            const data= this.create({
            userName,
            password:hash,
            name:"Random Name"
            })

       await this.save(data);
      }catch(error){
            if(error.code==="23505"){
                  throw new ConflictException('userName already exists')
            }
            throw InternalServerErrorException
            }

        }

        async signIn(authCredentialsDTO:AuthCredentialsDTO):Promise<string>{
            const user=await this.findOne({where:{userName:authCredentialsDTO.userName}});
            if(user && await bcrypt.compare(authCredentialsDTO.password,user.password)){
                  return 'success';
            }
            throw new UnauthorizedException('Please check your credentials')
            
        }
}