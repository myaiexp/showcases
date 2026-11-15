// embedding-atlas example: the highlight prop, row ids set from outside
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Highlight rows by id',
  summary:
    'highlight takes an array of row ids and marks them on the embedding view and in the instances table, without changing the filter. The select queries the rows of one topic among the first twelve ids and passes them through atlas.update({ highlight }); null clears it.',
  section: 'EmbeddingAtlas',
  tags: ['highlight', 'update', 'RowID', 'defaultChartsConfig'],
  docs: ['repo/packages/viewer/src/api.ts', 'pages/apple-github-io/embedding-atlas/embedding-atlas.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
