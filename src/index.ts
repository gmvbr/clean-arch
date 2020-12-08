import fastify from 'fastify';
import autoload from 'fastify-autoload';
import {join} from 'path';

import {Config, Configuration} from './config';

declare module 'fastify' {
  interface FastifyInstance {
    config: Configuration;
  }
}

export async function bootstrap() {
  fastify()
    .decorate('config', Config)
    .register(autoload, {
      dir: join(__dirname, 'services'),
    })
    .listen(Config.PORT!, Config.HOST!);
}

bootstrap();
