// observable-plot example: Marks: the missing bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: the missing bar',
  summary:
    'barY hides a missing year because its x scale is ordinal; rectY with interval: 1, or an interval on the x scale, reveals the gap.',
  section: 'Marks',
  tags: ['Plot.barY', 'Plot.rectY', 'interval', 'x.interval', 'tickFormat'],
  docs: ['repo/docs/features/marks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
