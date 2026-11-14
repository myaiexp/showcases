// ky example: 413 is retried only with a timing header
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '413: retried only with a hint',
  summary:
    'A "payload too large" answer normally means the upload will never fit, so retrying is pointless. But some servers say 413 when they are momentarily out of room, and add a Retry-After to say so. Ky retries a 413 only in that case, or when your own rule says yes.',
  section: 'Retry',
  tags: ['413', 'Retry-After', 'retry.shouldRetry', 'retry.statusCodes'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
