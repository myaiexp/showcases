// ky example: totalTimeout caps tries and pauses together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Total timeout',
  summary:
    'With retries and growing pauses, a failing request can keep your user waiting far longer than any single timeout suggests. totalTimeout sets one deadline for the whole job: when it passes, Ky stops, even in the middle of a pause, and throws a TimeoutError.',
  section: 'Timeouts and limits',
  tags: ['totalTimeout', 'timeout', 'retry', 'TimeoutError'],
  docs: ['repo/readme.md', 'repo/source/errors/TimeoutError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
