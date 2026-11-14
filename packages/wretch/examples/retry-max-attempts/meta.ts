// Give up after N tries: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Give up after N tries',
  summary:
    'The server never recovers. maxAttempts says how many times wretch may retry before it stops and reports failure; the slider changes it and the timeline counts the bars: the first try plus that many retries. Then the app shows its error message.',
  section: 'Middlewares',
  tags: ['retry', 'maxAttempts', 'middlewares'],
  docs: ['repo/src/middlewares/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
