// embedding-atlas example: CountPlotState selection saved in chartStates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Count plot selection preset",
  summary:
    "chartStates entry for a count plot is { selection: [categories] }. The variants preselect one topic, two topics and a SQL-derived month category; the words histogram beside it shows only the selected rows.",
  section: "Charts",
  tags: ['count-plot', 'CountPlotState', 'selection', 'chartStates', '{ sql }'],
  docs: [
    'repo/packages/viewer/src/charts/basic/types.ts',
    'repo/packages/viewer/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
