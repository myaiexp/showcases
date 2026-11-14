// ky example: the timeout restarts for every retry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeout per try',
  summary:
    'Ky\'s timeout is a limit for one try, not for the whole job. With retries on, every new try gets a fresh clock, so three tries can take three timeouts plus the pauses. The bars on the timeline are all the same length.',
  section: 'Timeouts and limits',
  tags: ['timeout', 'retryOnTimeout', 'retry', 'per-attempt'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
