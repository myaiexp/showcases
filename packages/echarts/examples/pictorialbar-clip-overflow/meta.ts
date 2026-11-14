// echarts example: Pictorial bar clip against the grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pictorial bar clip against the grid',
  summary:
    'Stacks of small rectangles with an axis max below some values. Toggle clip to cut the overflowing symbols at the grid edge or let them spill over, and slide yAxis.max.',
  section: 'Option: series.pictorialBar',
  tags: ['pictorialBar', 'clip', 'symbolRepeat', 'symbolMargin', 'yAxis.max'],
  docs: ['repo/en/option/series/pictorialBar.md', 'repo/en/option/partial/clip.md', 'repo/contents/en/basics/release-note/5-5-0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
