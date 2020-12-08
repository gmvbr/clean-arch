import fastify from 'fastify';

import blipp from 'fastify-blipp';
import autoload from 'fastify-autoload';

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
    .register(autoload, {
      dir: join(__dirname, 'services'),
      ignorePattern: /.*(test|spec).js/,
    });
  app.listen(Config.PORT!, Config.HOST!);
  app.blipp();
}

bootstrap();
