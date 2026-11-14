// Retry when the connection drops: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retry when the connection drops',
  summary:
    'The retry middleware tries again when the connection itself fails, waiting a little longer each time. The server drops the first few connections; a timeline shows each attempt as a bar, red while it fails and green when one finally gets through, or the app giving up when too many drop.',
  section: 'Usage',
  tags: ['retry', 'middlewares', 'retryOnNetworkError', 'maxAttempts', 'fetchError'],
  docs: ['repo/README.md', 'repo/src/middlewares/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
