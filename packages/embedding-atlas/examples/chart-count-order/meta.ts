// embedding-atlas example: count-plot order: total, selected and a custom array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Count plot order",
  summary:
    "Six orderings of the same topic count plot: total-descending (default), total-ascending, selected-descending, selected-ascending, and an explicit array of category names. selected-* orders by the rows the words brush keeps.",
  section: "Charts",
  tags: ['count-plot', 'order', 'total-ascending', 'selected-descending', 'selected-ascending', 'chartStates'],
  docs: [
    'repo/packages/viewer/src/charts/basic/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
