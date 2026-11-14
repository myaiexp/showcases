// ky example: retry.delay shapes the pauses between tries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Choose your own pauses',
  summary:
    'Doubling is a good default, but sometimes you want a steady beat, a slow ramp or a sharp climb. A `delay` function turns "which retry is this" into "how many milliseconds to wait", and the timeline shows the rhythm you chose.',
  section: 'Retry',
  tags: ['retry.delay', 'backoff', 'linear', 'constant'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
