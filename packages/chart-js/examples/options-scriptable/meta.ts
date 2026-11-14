// Chart.js example: Colour each bar from its value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colour each bar from its value',
  summary:
    'A function in place of a colour is called for every bar with its context, so the colour can depend on the data: blue below freezing, red above the heat limit, amber in between. Move the limits and the bars recolour.',
  section: 'General',
  tags: ['scriptable', 'backgroundColor', 'context', 'raw'],
  docs: ['repo/docs/general/options.md', 'repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
