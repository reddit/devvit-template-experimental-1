import { redis } from '@devvit/web/server';

const key = 'count';

export const countGet = async () => {
  return Number((await redis.get(key)) ?? 0);
};

export const countIncrement = async (amount: number = 1) => {
  return await redis.incrBy(key, amount);
};

export const countDecrement = async (amount: number = 1) => {
  return await redis.incrBy(key, -amount);
};
