import {Config} from './config';

describe('test config defaults', () => {
  it('expect default values', async () => {
    delete process.env.HOST;
    delete process.env.PORT;
    expect(Config).toStrictEqual({
      PORT: '3000',
      HOST: '0.0.0.0',
    });
  });
});
