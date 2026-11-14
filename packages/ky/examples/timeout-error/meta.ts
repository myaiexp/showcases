// ky example: TimeoutError carries the request
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which request ran out of time',
  summary:
    'When several things load at once and one of them is too slow, you need to know which. A TimeoutError carries error.request, the request that timed out, so a single catch can mark the right box as failed while the others keep working.',
  section: 'Error classes',
  tags: ['TimeoutError', 'isTimeoutError', 'error.request', 'timeout'],
  docs: ['repo/readme.md', 'repo/source/errors/TimeoutError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
