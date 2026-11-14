// ky example: shouldRetry replaces the built-in retry decision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your own retry rule',
  summary:
    'The built-in rules cannot know that your API treats a rate limit as worth two more tries but every other client error as final. A shouldRetry function gets the error and the retry number and answers yes, no, or "use the defaults". Compare the timeline with and without the rule.',
  section: 'Retry',
  tags: ['retry.shouldRetry', 'isHTTPError', '429', 'retryCount'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
