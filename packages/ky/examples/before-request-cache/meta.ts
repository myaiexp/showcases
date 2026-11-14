// ky example: before-request-cache
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'beforeRequest: answer without asking',
  summary:
    'The fastest request is the one that never leaves. If a beforeRequest hook returns a ready-made Response, Ky uses it and skips the trip to the server entirely. Here a small cache answers repeat questions about the weather, and a second hook fills the cache from real answers.',
  section: 'Hooks',
  tags: ['beforeRequest', 'Response', 'cache', 'afterResponse'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
