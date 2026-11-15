// embedding-atlas example: two Mosaic views linked by a crossfilter Selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cross-filtering projections',
  summary:
    'Two EmbeddingViewMosaic views show different projections of the same table and share one crossfilter Selection as both filter and rangeSelection. Brushing either one filters the other to the rows inside its brush, while the brushed view keeps all its points.',
  section: 'EmbeddingViewMosaic',
  tags: ['filter', 'rangeSelection', 'Selection.crossfilter', 'rangeSelectionValue'],
  docs: [
    'repo/packages/docs/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
