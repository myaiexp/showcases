// tanstack-charts example: Dumbbell for two values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dumbbell for two values',
  summary:
    'Two values per product shown as two dots joined by a link, which makes each change visible without a zero baseline.',
  section: 'Choosing a Chart',
  tags: ['link', 'dot', 'scaleBand'],
  docs: [
    'repo/docs/guides/choosing-a-chart.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
