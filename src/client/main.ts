import { navigateTo } from '@devvit/web/client';
import { trpc } from './trpc';

const counterValueElement = document.getElementById(
  'counter-value'
) as HTMLSpanElement;
const incrementButton = document.getElementById(
  'increment-button'
) as HTMLButtonElement;
const decrementButton = document.getElementById(
  'decrement-button'
) as HTMLButtonElement;

const docsLink = document.getElementById('docs-link') as HTMLDivElement;
const playtestLink = document.getElementById('playtest-link') as HTMLDivElement;
const discordLink = document.getElementById('discord-link') as HTMLDivElement;

docsLink.addEventListener('click', () => {
  navigateTo('https://developers.reddit.com/docs');
});

playtestLink.addEventListener('click', () => {
  navigateTo('https://www.reddit.com/r/Devvit');
});

discordLink.addEventListener('click', () => {
  navigateTo('https://discord.com/invite/R7yu2wh9Qz');
});

const titleElement = document.getElementById('title') as HTMLHeadingElement;

let currentPostId: string | null = null;

async function fetchInitialCount() {
  try {
    const response = await trpc.init.get.query();
    counterValueElement.textContent = response.count.toString();
    currentPostId = response.postId || null; // Store postId for later use
    titleElement.textContent = `Hey ${response.username} 👋`;
  } catch (error) {
    console.error('Error fetching initial count:', error);
    counterValueElement.textContent = 'Error';
  }
}

async function updateCounter(action: 'increment' | 'decrement') {
  if (!currentPostId) {
    console.error('Cannot update counter: postId is not initialized.');
    // Optionally, you could try to re-initialize or show an error to the user.
    return;
  }

  try {
    const response = await trpc.counter[action].mutate();
    counterValueElement.textContent = response.count.toString();
  } catch (error) {
    console.error(`Error ${action}ing count:`, error);
    counterValueElement.textContent = 'Error';
  }
}

incrementButton.addEventListener('click', () => updateCounter('increment'));
decrementButton.addEventListener('click', () => updateCounter('decrement'));

// Fetch the initial count when the page loads
fetchInitialCount();
