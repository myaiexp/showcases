// ky example: after-response-token-refresh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'afterResponse: refresh, then ask again',
  summary:
    'A POST is normally never retried, because sending an order twice could charge you twice. But a 401 means the server did not process it, so it is safe to try again. An afterResponse hook can spot the 401, fetch a new token and force a retry with ky.retry.',
  section: 'Hooks',
  tags: ['afterResponse', 'ky.retry', '401', 'token', 'POST'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
