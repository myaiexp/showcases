// Hand wretch to code that expects fetch: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hand wretch to code that expects fetch',
  summary:
    'Some libraries only know how to call fetch(url, options). .toFetch() turns a configured wretch client into exactly that: a plain function. A "third-party" widget uses it without knowing wretch exists, and still gets the login header added and its 401 caught.',
  section: 'Usage',
  tags: ['toFetch', 'auth', 'catcher', 'integration'],
  docs: ['repo/README.md', 'repo/src/types.ts', 'repo/src/core.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
