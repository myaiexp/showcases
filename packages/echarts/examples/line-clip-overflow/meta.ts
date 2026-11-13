// echarts example: Clipping lines at the axis edge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clipping lines at the axis edge',
  summary:
    'A wave that is taller than its y axis and wider than the x window. Toggle series.clip to see the line cut at the grid edge or run past it, and slide the x window to watch symbols vanish once their centre leaves the grid.',
  section: 'Option: series.line',
  tags: ['clip', 'min', 'max', 'symbol', 'value axis'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/clip.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
