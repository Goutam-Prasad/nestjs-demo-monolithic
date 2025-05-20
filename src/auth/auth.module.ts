import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStatergy } from './jwt.statergy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: "Testing",
    signOptions: {
      expiresIn: 3600,
      algorithm: 'HS256'
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStatergy],
  exports: [JwtModule, PassportModule]
})
export class AuthModule {}
