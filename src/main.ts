import fastifyHelmet from '@fastify/helmet';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { QueryFailedFilter } from '@filters/query-failed.filter';
import { HttpExceptionFilter } from '@filters/bad-request.filter';
import { SharedModule } from '@shared/shared.module';
import { ApiConfigService } from '@shared/services/api-config.service';
import { setupSwagger } from './setup-swagger';
import { join } from 'path';

async function bootstrap(): Promise<NestFastifyApplication> {
  const fastifyAdapter = new FastifyAdapter();
  fastifyAdapter.register(await import('@fastify/multipart'));
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    {
      rawBody: true,
      cors: true,
    },
  );
  const instance = app.getHttpAdapter().getInstance();

  app.setGlobalPrefix('api');

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [
          `'self'`,
          `'unsafe-inline'`,
          'cdn.jsdelivr.net',
          'fonts.googleapis.com',
        ],
        fontSrc: [`'self'`, 'fonts.gstatic.com'],
        imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
      },
    },
  });
  await app.register(import('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute',
  });
  await app.register(await import('@fastify/compress'), { global: false });
  instance.addHook('onRequest', async (request, reply) => {
    Logger.log(`---> ${request.method} ${request.url} <---`);
  });

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    new QueryFailedFilter(reflector),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );
  const configService = app.select(SharedModule).get(ApiConfigService);
  const port = configService.appConfig.port;

  if (configService.documentationEnabled) {
    setupSwagger(app);
  }
  console.log('PATH ==> ', join(__dirname, '../', 'public'));

  app.useStaticAssets({
    root: join(__dirname, '../', 'public'),
    prefix: '/public/',
  });

  await app.listen(port, '0.0.0.0');

  Logger.log(`---> Application is running on: ${await app.getUrl()}  <---`);
  return app;
}

void bootstrap();
