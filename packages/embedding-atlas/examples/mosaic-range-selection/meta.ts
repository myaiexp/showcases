// embedding-atlas example: capturing the range brush in a Mosaic Selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brush into a Selection',
  summary:
    'Passing a Mosaic Selection as rangeSelection makes the view publish its brush there as a SQL predicate. A listener on the Selection prints that predicate and counts the rows it matches.',
  section: 'EmbeddingViewMosaic',
  tags: ['rangeSelection', 'Selection', 'predicate', 'rangeSelectionValue'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
