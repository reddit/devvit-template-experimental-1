import { createDevvitTest } from '@devvit/test/server/vitest';

/**
 * Initializes a test environment for the server. This is a great place
 * to put Devvit settings so you don't need to mock them per file. For example:
 *
 * ```ts
 * export const test = createDevvitTest({
 *  settings: {
 *    API_KEY: 'foo'
 *  },
 * });
 * ```
 */
export const test = createDevvitTest();
