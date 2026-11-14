// ky example: maxRetryAfter caps how long Ky obeys a server's wait
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cap a server\'s long wait',
  summary:
    'A server can ask you to wait a minute, or an hour, and your page would sit there. maxRetryAfter sets the longest wait Ky will accept from a Retry-After header: ask for an hour, and Ky waits only the cap before trying again.',
  section: 'Retry',
  tags: ['retry.maxRetryAfter', 'Retry-After', '503'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
