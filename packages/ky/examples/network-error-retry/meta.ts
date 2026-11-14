// ky example: network errors are retried for safe methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dropped connections',
  summary:
    'A tunnel, a weak signal or a hiccup in the router can cut a request off before any answer comes back. Ky treats that as worth retrying for reads, so the feed loads on its own; for a POST it stops, because it cannot tell whether the server saw it. Set the number of drops to run past the retry limit.',
  section: 'Retry',
  tags: ['NetworkError', 'retry', 'offline', 'retry.methods'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts', 'repo/source/errors/NetworkError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
