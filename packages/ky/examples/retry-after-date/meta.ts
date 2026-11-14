// ky example: Retry-After given as an HTTP date
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retry-After as a clock time',
  summary:
    'Servers may say "come back at 10:42:07 GMT" instead of "wait 3 seconds". Ky reads the date, works out how long is left from now, and waits exactly that. A time already in the past means no wait at all.',
  section: 'Retry',
  tags: ['Retry-After', 'HTTP-date', '503', 'afterStatusCodes'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
