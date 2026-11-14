// ky example: Ky obeys a Retry-After given in seconds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retry-After in seconds',
  summary:
    'When a server says "too many requests, come back in 2 seconds", asking sooner only gets you refused again. Ky reads the Retry-After header and waits exactly that long instead of its usual pause. Change the number and watch the gap on the timeline follow it.',
  section: 'Retry',
  tags: ['Retry-After', '429', 'retry.afterStatusCodes', 'rate limit'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
