import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate({ iat, exp, id }: JwtPayload, done: any) {
    if (iat && exp && id) {
      const timeDiff = exp - iat;
      if (timeDiff <= 0) {
        throw new UnauthorizedException();
      }

      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new UnauthorizedException();
      }
      done(null, user);
    } else {
      throw new UnauthorizedException();
    }
  }
}
