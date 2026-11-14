// Chart.js example: Stacked area chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stacked area chart',
  summary:
    'Website visits by source piled into one filled shape whose outline is the total. Stacking is switched on with stacked: true on the value axis.',
  section: 'Chart types',
  tags: ['line', 'stacked', 'area', 'fill'],
  docs: ['repo/docs/charts/line.md', 'repo/docs/charts/area.md', 'repo/docs/axes/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
