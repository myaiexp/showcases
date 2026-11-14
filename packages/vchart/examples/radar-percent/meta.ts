// vchart example: Percentage stacked radar chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Percentage stacked radar chart",
  summary:
    "percent: true on top of stack normalises every month to 100 percent, and the radius axis labels are formatted with formatMethod. The shape of each series is its share, not its size.",
  section: "Pie, Rose and Radar",
  tags: ['radar', 'stack', 'percent', 'formatMethod'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Radar.md',
    'repo/docs/assets/option/en/series/radar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
