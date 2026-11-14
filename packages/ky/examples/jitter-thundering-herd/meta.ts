// ky example: retry jitter spreads out a crowd of clients
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Jitter: breaking up the stampede',
  summary:
    'When a server recovers, a crowd of pages that all retry on the same beat hit it together and knock it over again. Jitter makes each client wait a slightly different time. Each dot is one request; watch the tall stacks flatten out when jitter is on.',
  section: 'Retry',
  tags: ['retry.jitter', 'thundering herd', 'backoff'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
