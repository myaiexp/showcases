// embedding-atlas example: scale.color.discontinuityAtZero on a heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Color scale discontinuity at zero",
  summary:
    "A topic by source heatmap of document counts, some of them zero. With discontinuityAtZero the empty cells keep the background color and the smallest counts stay distinct; turned off, the faint ones fade into it.",
  section: "Charts",
  tags: ['scale', 'discontinuityAtZero', 'color', 'mark: rect', 'type: log'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
    'repo/packages/viewer/src/charts/common/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
