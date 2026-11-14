// ky example: the retry limit decides how many extra tries Ky makes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retry limit',
  summary:
    'A busy server often needs more than one nudge, but you do not want to ask for ever. Giving Ky a number, `retry: 3`, sets how many extra tries it makes before it gives up and throws. Slide the limit and watch the timeline grow one attempt at a time.',
  section: 'Retry',
  tags: ['retry', 'retry.limit', 'number shorthand', '503'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
