// ky example: retry.methods retries safe requests but not writes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which requests get retried',
  summary:
    'Repeating a read is harmless, but repeating "place my order" might charge you twice, because a lost answer does not mean the server ignored you. Ky retries GET, PUT and other repeat-safe requests by default and leaves POST alone. The shop panel shows what a repeated POST would have done.',
  section: 'Retry',
  tags: ['retry.methods', 'POST', 'GET', 'idempotent'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
