// tanstack-charts example: Lines by series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lines by series',
  summary:
    'One lineY call draws three lines because z names the series column. A checkbox toggles the points option, which puts a dot on every valid row; the tooltip shows the original row.',
  section: 'Line and Area Marks',
  tags: ['lineY', 'z', 'points', 'scaleUtc', 'tooltip'],
  docs: ['repo/docs/reference/marks/line-and-area.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
