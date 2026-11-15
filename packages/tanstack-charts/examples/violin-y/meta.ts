// tanstack-charts example: Violins with violinY
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Violins with violinY',
  summary:
    'violinY mirrors prepared normalised widths around each category centre, so a histogram profile becomes a violin. A dot at each group\'s median comes from groupBy and the median reducer; the curve option smooths the outline with d3AreaXCurve.',
  section: 'Violin Marks',
  tags: ['violinY', 'binY', 'normalize', 'groupBy', 'median', 'd3AreaXCurve', 'dot'],
  docs: [
    'repo/docs/reference/marks/violin.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/guides/tooltips-and-focus.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
