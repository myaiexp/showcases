// embedding-atlas example: the layer interpolate option on a line mark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Line interpolation",
  summary:
    "A line of mean score across binned word counts. Each variant sets interpolate on the layer: linear, cardinal, catmull-rom, natural, monotone, basis and the three step modes.",
  section: "Charts",
  tags: ['mark: line', 'interpolate', 'step', 'monotone', 'basis', 'cardinal'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
