You are writing a Devvit web application that will be executed on Reddit.com. To learn more about Devvit, use the devvit-mcp if configured or go to https://developers.reddit.com/docs/llms.txt.

## Tech Stack

- **Frontend**: React 19, Tailwind CSS 4, Vite
- **Backend**: Node.js serverless environment (Devvit), Hono, TRPC
- **Communication**: tRPC v11 for end-to-end type safety
- **Testing**: Vitest

## Layout & Architecture

- `/src/server`: **Backend Code**. This runs in a secure, serverless environment.
  - `trpc.ts`: Defines the API router and procedures.
  - `index.ts`: Main server entry point (Hono app).
  - Access `redis`, `reddit`, and `context` here via `@devvit/web/server`.
- `/src`: **Frontend Code**. This runs in the user's browser (WebView).
  - `game.tsx`: The main React entry point (Expanded View).
  - `splash.tsx`: The initial React entry point (Inline View).
  - `trpc.ts`: The tRPC client instance.
  - Access navigation and UI utilities here via `@devvit/web/client`.

## Data Fetching (tRPC)

This project uses tRPC for communication between the client and server.

1. **Define Procedure**: Add a new query or mutation in `src/server/trpc.ts`.
2. **Call in Client**: Use `trpc.procedureName.query()` or `.mutate()` in your React components.

## Platform Integration (Menu, Forms, & Triggers)

Devvit platform features like Menu Items, Forms, and Triggers are handled via Hono routes and `devvit.json` configuration.

1. **Define Route**: Add a route in `src/server/routes/` (e.g., `menu.ts`) and mount it in `src/server/index.ts` under `/internal`.
2. **Configure**: Add the mapping in `devvit.json` pointing to the route (e.g., `/internal/menu/post-create`).

## WebView Architecture

This template uses a two-stage WebView pattern:

1.  **Inline View (`splash.tsx`)**: The default view shown in the feed. Defined as `default` in `devvit.json`. Use `requestExpandedMode` to transition to the game view.
2.  **Expanded View (`game.tsx`)**: The immersive view. Defined as `game` in `devvit.json`.

## Dev Environment Tips

- After making changes, run `npm run type-check` to make sure the Typescript types are compiling correctly.
- Use `npm run test -- my-file-name` to run isolated tests against files

## Code Style

- Prefer type aliases over interfaces when writing typescript
- Prefer named exports over default exports
- Never cast typescript types

## Testing

For all server tests, utilize the initialized `@devvit/test` harness located here: `src/server/test.ts`. It is a Vitest compatible API that runs in-memory mocks for all of the `@devvit/web/server` capabilities. This makes it to where you will rarely need to use or reset mocks (except for the reddit API where you will receive a helpful error when you need to mock). Each test runs completely isolated from another so you should not need `beforeAll`, `afterAll`, or similar lifecycle hooks either.

For example, given this file:

```ts
// src/server/core/increment.ts
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
```

The tests can be:

```ts
// src/server/core/increment.test.ts
import { expect } from 'vitest';
import { test } from '../test';
import { countDecrement, countGet, countIncrement } from './increment';

test('Should increment the count', async () => {
  const count = await countGet();
  expect(count).toBe(0);
  const newCount = await countIncrement();
  expect(newCount).toBe(1);
});

test('Should decrement the count', async () => {
  // Note how this is running against the same key as the previous function
  // and no mocks or resetting of mocks was needed!
  const count = await countGet();
  expect(count).toBe(0);
  const newCount = await countDecrement();
  expect(newCount).toBe(-1);
});
```

Learn more about the test harness here: https://developers.reddit.com/docs/next/guides/tools/devvit_test

## Legacy Rules

- You may find code that references blocks or `@devvit/public-api` while building a feature. Do NOT use this code as this project is configured to use Devvit web only.
