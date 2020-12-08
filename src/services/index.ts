import {FastifyInstance} from 'fastify';

async function Service(fastify: FastifyInstance) {
  fastify.get('/', async () => ({
    success: true,
    message: 'hello world',
  }));
}

export default Service;
