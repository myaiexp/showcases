// Decide what counts as the same request: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Decide what counts as the same request',
  summary:
    'Dedupe merges requests that share a key, by default the method and the full address. Three calls for one post differ only by a throw-away "?_=" tag, so by default they are three different requests. A custom key that ignores that tag makes them one.',
  section: 'Middlewares',
  tags: ['dedupe', 'key', 'middlewares'],
  docs: ['repo/src/middlewares/dedupe.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
