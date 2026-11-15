// embedding-atlas example: caching automatic labels through the cache prop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label cache',
  summary:
    'cache is any object with async get(key) and set(key, value). The view stores its automatic labels there, so remounting the same view asks the cache first and skips queryClusterLabels on a hit. The log shows the misses, the set and then the hits.',
  section: 'EmbeddingView',
  tags: ['cache', 'Cache', 'queryClusterLabels'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
