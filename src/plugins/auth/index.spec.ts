import fastify from 'fastify';

import jwt from 'fastify-jwt';
import auth from 'fastify-auth';

import plugin from './index';

describe('test plugin: auth', () => {
  const app = fastify()
    .register(jwt, {
      secret: 'test',
    })
    .register(plugin);

  app.register(auth).after(() => {
    app.post('/sign', async () => ({
      token: app.jwt.sign('admin'),
    }));
    app.post(
      '/verify',
      {preHandler: app.auth([app.authenticate])},
      async () => ({
        success: true,
      })
    );
  });

  beforeAll(async () => await app.listen(0));
  afterAll(async () => app.close());

  it('test invalid jwt', async () => {
    const response = await app.inject({
      method: 'POST',
      path: '/verify',
      headers: {
        authorization: 'Bearer error',
      },
    });
    expect(response.json()).toStrictEqual({
      error: 'Unauthorized',
      message: 'Authorization token is invalid: jwt malformed',
      statusCode: 401,
    });
  });

  it('test valid jwt', async () => {
    const token = await app.inject({
      method: 'POST',
      path: '/sign',
    });
    const response = await app.inject({
      method: 'POST',
      path: '/verify',
      headers: {
        authorization: 'Bearer ' + token.json().token,
      },
    });
    expect(response.json()).toStrictEqual({
      success: true,
    });
  });
});
