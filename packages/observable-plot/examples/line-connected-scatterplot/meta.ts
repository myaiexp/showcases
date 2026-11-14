// observable-plot example: Line: connected scatterplot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: connected scatterplot',
  summary:
    'Miles driven against the price of gas, joined in year order with a catmull-rom curve and a dot marker on each year. A text mark labels every fifth year, and a toggle swaps the curve for straight segments.',
  section: 'Mark: Line',
  tags: ['line', 'curve', 'marker', 'text', 'filter'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/data/driving.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
