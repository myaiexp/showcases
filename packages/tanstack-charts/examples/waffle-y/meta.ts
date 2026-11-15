// tanstack-charts example: Waffle chart with waffleY
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waffle chart with waffleY',
  summary:
    'waffleY divides each row\'s contribution into equal square cells, filling left to right and then bottom to top. With unit 1 and columns 10, a set of shares that sums to 100 makes the familiar ten-by-ten percentage grid. No positional scales are needed.',
  section: 'Waffle Marks',
  tags: ['waffleY', 'unit', 'columns', 'gap', 'radius', 'colorLegend'],
  docs: [
    'repo/docs/reference/marks/waffle.md',
    'repo/docs/guides/legends-and-color.md',
    'repo/docs/guides/tooltips-and-focus.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
