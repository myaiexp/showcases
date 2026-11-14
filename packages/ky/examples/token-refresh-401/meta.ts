// ky example: token-refresh-401
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Refresh an expired login on a 401',
  summary:
    'Login tokens expire, and the first sign is a 401. Tell Ky to retry on 401, add the token in a beforeRequest hook, and refresh it in a beforeRetry hook: the call that hit the expiry heals itself, and later calls start with the new token.',
  section: 'FAQ',
  tags: ['retry.statusCodes', 'beforeRetry', 'beforeRequest', '401', 'token'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
