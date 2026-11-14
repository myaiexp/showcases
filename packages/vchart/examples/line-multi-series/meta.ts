// vchart example: Line: multiple series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: multiple series',
  summary:
    'seriesField splits one dataset into a line per value, each with its own color, and the legend toggles them. The three series take a new random walk every couple of seconds.',
  section: 'Line and Area',
  tags: ['line', 'xField', 'yField', 'seriesField', 'legends', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Line.md',
    'repo/docs/assets/option/en/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
