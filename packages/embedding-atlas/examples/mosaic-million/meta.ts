// embedding-atlas example: a million DuckDB rows in EmbeddingViewMosaic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A million rows in DuckDB',
  summary:
    'The table never exists in JavaScript: DuckDB generates a million points on eight spiral arms with range() and random(), and EmbeddingViewMosaic reads the x, y and arm columns from it by name.',
  section: 'EmbeddingViewMosaic',
  tags: ['table', 'x', 'y', 'category', 'coordinator'],
  docs: ['repo/packages/docs/embedding-view-mosaic.md', 'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
