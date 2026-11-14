// A REST client that returns data: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A REST client that returns data',
  summary:
    'Set up the client once with a login header and .resolve(r => r.json()), and every call becomes a plain await that returns the data itself: the user list, the freshly created user. No .json() on each call.',
  section: 'Usage',
  tags: ['auth', 'resolve', 'json', 'get', 'post', 'REST'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
