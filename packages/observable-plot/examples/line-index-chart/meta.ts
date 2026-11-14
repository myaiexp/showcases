// observable-plot example: Line: index chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: index chart',
  summary:
    'Four stocks rebased to their first close with normalizeY, drawn on a log scale and labelled at the last point with selectLast. stroke doubles as the series grouping, and a custom tick format turns multiples into percent change.',
  section: 'Mark: Line',
  tags: ['line', 'normalizeY', 'selectLast', 'text', 'log scale', 'tickFormat', 'stroke'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
