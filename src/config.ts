import envSchema from 'env-schema';

const schema = {
  type: 'object',
  required: ['PORT', 'HOST', 'JWT_SECRET'],
  properties: {
    PORT: {
      type: 'string',
      default: '3000',
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0',
    },
    JWT_SECRET: {
      type: 'string',
    },
  },
};

export interface Configuration {
  PORT?: string;
  HOST?: string;
  JWT_SECRET?: string;
}

export const Config: Configuration = envSchema({
  schema: schema,
  dotenv: true,
});
