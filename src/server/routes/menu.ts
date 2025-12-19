import { context } from '@devvit/web/server';
import { Hono } from 'hono';
import { createPost } from '../core/post';

export const menu = new Hono();

menu.post('/post-create', async (c) => {
  try {
    const post = await createPost();

    c.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    c.status(400);
    c.json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});
