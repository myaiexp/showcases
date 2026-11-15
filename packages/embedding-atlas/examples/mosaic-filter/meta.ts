// embedding-atlas example: filtering EmbeddingViewMosaic with a Selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filter by a Selection',
  summary:
    'filter takes a Mosaic Selection, and only rows passing its predicate are drawn. Two sliders put an interval clause on the score column into the Selection; the readout counts the rows that pass with the same predicate.',
  section: 'EmbeddingViewMosaic',
  tags: ['filter', 'Selection', 'clauseInterval'],
  docs: [
    'repo/packages/docs/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
