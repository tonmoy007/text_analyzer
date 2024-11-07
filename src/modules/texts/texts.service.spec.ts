import { Test, TestingModule } from '@nestjs/testing';
import { TextsService } from './texts.service';
import { AppModule } from '../../app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { PrismaService } from '../common';
import { response } from 'express';

describe('TextsService', () => {
  let service: TextsService;
  let app: NestFastifyApplication;
  let token: string;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    const response = await app.inject({
      method: 'POST',
      url: '/auth/login',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'admin@test.io', password: 'password' },
    });
    const payload = response.json();
    token = payload.accessToken;
  });

  afterAll(async () => app.close());
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextsService, PrismaService],
    }).compile();
    service = module.get<TextsService>(TextsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('/Get Texts', async () =>
  {

    app
      .inject({
        method: 'GET',
        url: '/texts',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        // expect(result.payload).toEqual(/* expectedPayload */);
      })
  });
});
