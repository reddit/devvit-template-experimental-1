import { context, reddit } from '@devvit/web/server';

export const createPost = async () => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error('subredditName is required');
  }

  return await reddit.submitCustomPost({
    splash: {
      appDisplayName: 'create-my-app',
    },
    subredditName: subredditName,
    title: 'create-my-app',
  });
};
