import fastify from 'fastify';

import jwt from 'fastify-jwt';
import auth from 'fastify-auth';
import blipp from 'fastify-blipp';
import sensible from 'fastify-sensible';
import autoload from 'fastify-autoload';
import ratelimit from 'fastify-rate-limit';

import {join} from 'path';
import {Config, Configuration} from './config';

declare module 'fastify' {
  interface FastifyInstance {
    config: Configuration;
  }
}

export async function bootstrap() {
  const app = fastify()
    .decorate('config', Config)
    .register(blipp)
    .register(sensible)
    .register(auth)
    .register(jwt, {
      secret: Config.JWT_SECRET!,
    })
    .register(ratelimit, {
      max: 100,
      timeWindow: '1 minute',
    })
    .register(autoload, {
      dir: join(__dirname, 'plugins'),
      ignorePattern: /.*(test|spec).js/,
    })
    .register(autoload, {
      dir: join(__dirname, 'services'),
      ignorePattern: /.*(test|spec).js/,
    });
  app.listen(Config.PORT!, Config.HOST!);
  app.blipp();
}

bootstrap();
