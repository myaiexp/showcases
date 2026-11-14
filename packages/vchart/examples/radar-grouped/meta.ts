// vchart example: Grouped radar chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grouped radar chart",
  summary:
    "A seriesField with three values draws three overlapping radar shapes with no extra setting. A smooth radius grid with alternateColor bands and the angle axis domain line frame them.",
  section: "Pie, Rose and Radar",
  tags: ['radar', 'seriesField', 'axes', 'grid.smooth', 'alternateColor', 'legends'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Radar.md',
    'repo/docs/assets/option/en/series/radar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
