// ky example: retryOnTimeout turns timeouts into retries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retry after a timeout',
  summary:
    'A request that never answers is cut off by the timeout, but by default Ky does not try again: a stuck request is not the same as a busy server. Turn on retryOnTimeout and Ky drops the stuck try and sends a fresh one.',
  section: 'Retry',
  tags: ['retry.retryOnTimeout', 'timeout', 'TimeoutError'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts', 'repo/source/errors/TimeoutError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
