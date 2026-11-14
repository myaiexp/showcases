// ky example: ky-retry-polling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retry until the body says ready',
  summary:
    'Some servers answer 200 OK even when the thing you asked for is not ready yet; the news is in the body. An afterResponse hook can read the body and call ky.retry() to ask again, which turns Ky into a simple poller that still respects the retry limit.',
  section: 'FAQ',
  tags: ['ky.retry', 'afterResponse', 'polling', 'status'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
