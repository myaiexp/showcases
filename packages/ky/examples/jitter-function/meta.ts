// ky example: jitter functions, percentage and absolute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Jitter functions',
  summary:
    'Full jitter scatters retries widely, but sometimes you want only a small nudge so waits stay predictable. A jitter function receives the pause Ky worked out and returns the one to use, such as 80-120% of it, or plus or minus 100 ms. Compare how far each spreads the crowd.',
  section: 'Retry',
  tags: ['retry.jitter', 'jitter function', 'percentage', 'absolute'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
