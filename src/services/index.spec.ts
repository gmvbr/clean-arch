import fastify from 'fastify';
import service from './index';

describe('test service: index', () => {
  const server = fastify().register(service);

  beforeAll(async () => await server.listen(0));
  afterAll(async () => server.close());

  it('test method: GET /', async () => {
    const response = await server.inject({
      method: 'GET',
      path: '/',
    });
    expect(response.json()).toStrictEqual({
      success: true,
      message: 'hello world',
    });
  });
});
