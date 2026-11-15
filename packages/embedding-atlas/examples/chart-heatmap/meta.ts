// embedding-atlas example: a rect mark with x, y and an aggregated color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap from two binned fields",
  summary:
    "A rect layer with x on words, y on score and color set to a count aggregate paints a heatmap; a second rect layer with a constant color value fills the empty background. The brush encodes xy, and the variants preset a rectangle through chartStates.",
  section: "Charts",
  tags: ['mark: rect', 'encoding.color', 'aggregate: count', 'selection: xy', 'zIndex', 'bin'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
    'repo/packages/viewer/src/charts/chart_types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
