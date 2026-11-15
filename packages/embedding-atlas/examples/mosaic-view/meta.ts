// embedding-atlas example: the smallest EmbeddingViewMosaic on a DuckDB table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'First EmbeddingViewMosaic',
  summary:
    'The Mosaic flavour takes column names instead of arrays: a coordinator, a table, and its x, y and category columns. The view queries DuckDB for what it draws, and for hover and click it finds the nearest row itself, so no querySelection is needed.',
  section: 'EmbeddingViewMosaic',
  tags: ['new EmbeddingViewMosaic', 'coordinator', 'table', 'x', 'y', 'category'],
  docs: [
    'repo/packages/docs/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
