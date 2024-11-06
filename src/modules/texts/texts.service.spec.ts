import { Test, TestingModule } from '@nestjs/testing';
import { TextsService } from './texts.service';
import { AppModule } from '../../app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('TextsService', () => {
  let service: TextsService;
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => app.close());
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextsService],
    }).compile();

    service = module.get<TextsService>(TextsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('/Get Texts', async () =>
    app
      .inject({
        method: 'GET',
        url: '/texts',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        // expect(result.payload).toEqual(/* expectedPayload */);
      }));
});
