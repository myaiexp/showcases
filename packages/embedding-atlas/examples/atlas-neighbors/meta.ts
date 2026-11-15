// embedding-atlas example: data.neighbors, precomputed nearest neighbours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Precomputed neighbours column',
  summary:
    'data.neighbors names a column holding { ids, distances } per row, here built with createNNDescent and queryByIndex and stored as a struct column in DuckDB. With it, selecting a point in the embedding view shows its nearest neighbours. The panel reads the column back with SQL and highlights a row and its neighbours.',
  section: 'EmbeddingAtlas',
  tags: ['data.neighbors', 'createNNDescent', 'queryByIndex', 'highlight'],
  docs: [
    'repo/packages/viewer/src/api.ts',
    'repo/packages/docs/tool.md',
    'pages/apple-github-io/embedding-atlas/embedding-atlas.md',
    'repo/packages/docs/algorithms.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
