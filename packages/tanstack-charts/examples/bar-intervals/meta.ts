// tanstack-charts example: Floating bars from y1 to y2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Floating bars from y1 to y2',
  summary:
    'Supplying y1 or y2 turns off stacking, so each bar spans its own authored interval. The chart shows monthly temperature ranges as floating bars, including a below-zero month, because bars use the minimum mapped endpoint and the absolute length.',
  section: 'Bar and Rect Marks',
  tags: ['barY', 'y1', 'y2', 'negative values'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
