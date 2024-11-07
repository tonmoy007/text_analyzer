import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();

    await app.getHttpAdapter().getInstance().ready();
  });

  it('/ (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/',
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual('Hello World!');
  });
  it('/ (POST) LOGIN', () => {
    app
      .inject({
        method: 'POST',
        url: '/auth/login',
        headers: { 'Content-Type': 'application/json' },
        body: { email: 'admin@test.io', password: 'password' },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(201);
      });
  });
});
