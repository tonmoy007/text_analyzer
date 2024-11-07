import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            return {
              secret: configService.get('JWT_SECRET_KEY'),
              signOptions: {
                ...(configService.get('JWT_EXPIRATION_TIME')
                  ? {
                    expiresIn: Number(configService.get('JWT_EXPIRATION_TIME')),
                  }
                  : {}),
              },
            };
          },
          inject: [ConfigService],
        }),
        UsersModule,
      ],
      providers: [AuthService, JwtStrategy],
      exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
