// ky example: before-retry-refresh-token
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'beforeRetry: a fresh token for the retry',
  summary:
    'Login tokens expire. When the server answers 401 you want to fetch a new token and try again with it, not show an error. A beforeRetry hook runs right before each retry and can change the request, so the retry carries the new token.',
  section: 'Hooks',
  tags: ['beforeRetry', 'retry', '401', 'token'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
