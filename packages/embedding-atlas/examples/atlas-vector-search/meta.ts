// embedding-atlas example: searcher.vectorSearch ranked by JS distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector search',
  summary:
    'searcher.vectorSearch(query, { limit, predicate, onStatus }) returns { id, distance } pairs. Here a query word is embedded at the centre of its topic in the projection, every row\'s distance to it is computed in JavaScript, and the nearest rows come back. Cards run the searcher on a timer and highlight the hits.',
  section: 'EmbeddingAtlas',
  tags: ['searcher', 'vectorSearch', 'distance', 'onStatus', 'highlight'],
  docs: ['repo/packages/viewer/src/api.ts', 'pages/apple-github-io/embedding-atlas/embedding-atlas.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
