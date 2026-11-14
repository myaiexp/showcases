// ky example: stop-retrying-early
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Throw to stop retrying a hopeless call',
  summary:
    'Not every failure deserves a retry: a busy server may recover, but a request the server called invalid never will. A beforeRetry hook can throw to stop Ky at once and pass the error on to your code.',
  section: 'FAQ',
  tags: ['beforeRetry', 'throw', 'stop retrying', 'HTTPError'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
