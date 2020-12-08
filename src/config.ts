import envSchema from 'env-schema';

const schema = {
  type: 'object',
  required: ['PORT', 'HOST'],
  properties: {
    PORT: {
      type: 'string',
      default: '3000',
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0',
    },
  },
};

export interface Configuration {
  PORT?: string;
  HOST?: string;
}

export const Config: Configuration = envSchema({
  schema: schema,
  dotenv: true,
});
