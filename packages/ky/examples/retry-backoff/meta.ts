// ky example: the default retry pause doubles each time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Backoff: pauses that double',
  summary:
    'Hammering a struggling server makes things worse, so Ky waits before each retry, and waits twice as long every time: 0.3 s, 0.6 s, 1.2 s, 2.4 s. The timeline labels every pause so you can see the doubling for yourself.',
  section: 'Retry',
  tags: ['retry', 'backoff', 'retry.delay', 'exponential'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
