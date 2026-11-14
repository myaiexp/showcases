// ky example: before-retry-change-options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'beforeRetry: more time for the retry',
  summary:
    'A slow server may need more patience than your first guess. A beforeRetry hook can return new options, such as a longer timeout, that apply to this retry and the ones after it. The first try gives up quickly, and the retry waits longer.',
  section: 'Hooks',
  tags: ['beforeRetry', 'timeout', 'options'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
