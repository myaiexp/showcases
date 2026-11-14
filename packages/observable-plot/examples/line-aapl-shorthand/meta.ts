// observable-plot example: Line: pair shorthand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: pair shorthand',
  summary:
    'Apple closing prices as a line, first with x and y channels, then from an array of [date, close] pairs. The shorthand drops the axis labels; the label scale option brings them back.',
  section: 'Mark: Line',
  tags: ['line', 'shorthand', 'label'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
