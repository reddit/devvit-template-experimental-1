import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Context as HonoContext } from 'hono';

export async function createContext(
  _options: FetchCreateContextFnOptions,
  _c: HonoContext
) {
  return {};
}
export type Context = Awaited<ReturnType<typeof createContext>>;
