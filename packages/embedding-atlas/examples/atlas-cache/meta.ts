// embedding-atlas example: the cache prop with get and set logging
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A cache for Atlas',
  summary:
    'cache takes { get(key), set(key, value) } promises and uses them to keep intermediate results, so a second start is quicker. This one wraps a Map shared by two mounts and logs every get and set, so you can see which keys Atlas asks for and which come back as hits.',
  section: 'EmbeddingAtlas',
  tags: ['cache', 'Cache', 'get', 'set'],
  docs: ['repo/packages/viewer/src/api.ts', 'pages/apple-github-io/embedding-atlas/embedding-atlas.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
