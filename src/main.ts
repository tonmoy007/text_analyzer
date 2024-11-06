import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet'
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { CommonModule, LogInterceptor } from './modules/common';

const API_DEFAULT_PORT = 3000;
const API_DEFAULT_PREFIX = '/api/v1/';

const SWAGGER_TITLE = 'Text Analyzer API';
const SWAGGER_DESCRIPTION = 'API used for text analyzer';
const SWAGGER_PREFIX = '/docs';

function createSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix(process.env.API_PREFIX || API_DEFAULT_PREFIX);
  if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') {
    createSwagger(app);
  }
  const logInterceptor = app.select(CommonModule).get(LogInterceptor);
  await app.register(helmet)
  app.useGlobalInterceptors(logInterceptor);
  await app.listen(process.env.PORT ?? API_DEFAULT_PORT);
}

bootstrap()
  .then(() => {
    console.log(
      `Server started at port ${process.env.PORT ?? API_DEFAULT_PORT}`,
    );
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
