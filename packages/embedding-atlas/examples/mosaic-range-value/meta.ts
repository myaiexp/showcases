// embedding-atlas example: setting the brush shape with rangeSelectionValue
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brush shape from code',
  summary:
    'rangeSelectionValue sets the brush itself: a Rectangle, or a list of points read as a closed lasso. A rectangle, a triangle and a 24-sided circle are drawn over one cluster; onRangeSelection reports each change.',
  section: 'EmbeddingViewMosaic',
  tags: ['rangeSelectionValue', 'onRangeSelection', 'Rectangle', 'Point'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
