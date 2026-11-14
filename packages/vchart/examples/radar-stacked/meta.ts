// vchart example: Stacked radar chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stacked radar chart",
  summary:
    "stack: true adds the three series on top of each other, so each filled area sits on the one below. The radius axis starts at zero and the grid is smooth.",
  section: "Pie, Rose and Radar",
  tags: ['radar', 'stack', 'area', 'seriesField'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Radar.md',
    'repo/docs/assets/option/en/series/radar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
