import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./users.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStatergy extends PassportStrategy(Strategy) {
    constructor(private readonly userRepository: UserRepository) {
        super({
            secretOrKey: "Testing",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: any): Promise<User> {
        const { userName } = payload;
        const user = await this.userRepository.findOne({ where: { userName } });
        if (!user) {
            throw new UnauthorizedException("Unauthorized user");
        }
        return user;
    }
}