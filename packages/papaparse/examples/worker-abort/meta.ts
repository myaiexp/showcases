// Papa Parse example: abort a worker parse from step or from a button
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stop a worker in the middle',
  summary:
    'A worker cannot be paused, but it can be stopped: call parser.abort() on the parser your step function receives and the worker is shut down, so the rest of the file is never read. Press Abort while a big file streams in the full view.',
  section: 'FAQ',
  tags: ['worker', 'step', 'parser.abort', 'meta.aborted', 'complete'],
  docs: ['repo/docs/faq.html', 'repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
