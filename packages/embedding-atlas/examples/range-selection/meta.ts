// embedding-atlas example: range selections set in code and drawn by hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Range selection',
  summary:
    'rangeSelection takes a Rectangle { xMin, yMin, xMax, yMax } in data units and draws it as the current brush. Buttons move it from cluster to cluster; shift+drag draws your own, and onRangeSelection reports either kind, here with a count of the points inside.',
  section: 'EmbeddingView',
  tags: ['rangeSelection', 'onRangeSelection', 'Rectangle'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/utils.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
