import { expect } from 'vitest';
import { test } from '../test';
import { countDecrement, countGet, countIncrement } from './count';

test('Should increment the count', async () => {
  const count = await countGet();
  expect(count).toBe(0);
  const newCount = await countIncrement();
  expect(newCount).toBe(1);
});

test('Should decrement the count', async () => {
  const count = await countGet();
  expect(count).toBe(0);
  const newCount = await countDecrement();
  expect(newCount).toBe(-1);
});
