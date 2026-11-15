// embedding-atlas example: count-plot spec options in a one-chart dashboard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Count plot options',
  summary:
    'A { type: "count-plot" } chart over the topic column, set through initialState.charts and placed on a one-chart dashboard layout. The variants switch labels between counts, percentages and selected-over-total, sort alphabetically, and cap the bars with limit.',
  section: 'Charts',
  tags: ['count-plot', 'labels', 'order', 'limit', 'initialState', 'dashboard'],
  docs: [
    'repo/packages/viewer/src/charts/basic/types.ts',
    'repo/packages/viewer/src/api.ts',
    'repo/packages/viewer/src/layouts/dashboard/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
