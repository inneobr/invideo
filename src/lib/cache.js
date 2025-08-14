import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 443,
  password: process.env.REDIS_PASS,
  tls: {},
  parser: 'javascript',
});

export default redis;