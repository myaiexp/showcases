// ky example: automatic retries with growing pauses on a flaky server
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Automatic retries',
  summary:
    'Servers hiccup. When one answers "busy" (503), Ky waits a moment and asks again, then waits twice as long and asks once more. The timeline shows each try and each pause; your code only ever sees the final success.',
  section: 'Retry',
  tags: ['retry', '503', 'backoff', 'limit'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
