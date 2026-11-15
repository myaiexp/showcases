// embedding-atlas example: a brush on a band scale saving a category name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Brush on a category axis",
  summary:
    "On a bar chart of topics the brush selects categories, so its saved state is a string, not a [min, max] pair. Each variant presets one topic, and the words histogram beside it redraws for that topic only.",
  section: "Charts",
  tags: ['selection', 'XYSelectionValue', 'chartStates', 'mark: bar', 'filter: $filter'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
    'repo/packages/viewer/src/charts/common/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
