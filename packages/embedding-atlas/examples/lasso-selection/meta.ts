// embedding-atlas example: a polygon (lasso) range selection set from code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lasso selection',
  summary:
    'A range selection can also be a closed polygon: a list of points is read as a lasso. A ten-vertex star is laid around a cluster from code; drawn lassos come back through onRangeSelection as a Point[], counted here with a point-in-polygon test.',
  section: 'EmbeddingView',
  tags: ['rangeSelection', 'onRangeSelection', 'Point', 'lasso'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/utils.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
