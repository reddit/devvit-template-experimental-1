import { redis } from '@devvit/web/server';

const key = 'count';

export const countGet = async () => {
  return Number((await redis.get(key)) ?? 0);
};

export const countIncrement = async () => {
  return await redis.incrBy(key, 1);
};

export const countDecrement = async () => {
  return await redis.incrBy(key, -1);
};
