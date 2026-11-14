// ky example: before-retry-cached-response
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'beforeRetry: settle for a saved copy',
  summary:
    'When a server stays down, an old answer can beat an error message. A beforeRetry hook can return a ready-made Response instead of letting Ky try again, so after a few failures your page shows its last saved copy.',
  section: 'Hooks',
  tags: ['beforeRetry', 'Response', 'fallback', 'retryCount'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
