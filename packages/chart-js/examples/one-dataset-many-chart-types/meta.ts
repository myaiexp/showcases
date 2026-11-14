// Chart.js example: the same data rendered as five chart types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One dataset, many chart types',
  summary:
    'The same five traffic figures drawn five ways. Only the chart type changes: bars and lines compare sizes on axes, the radar shows a shape, doughnut and polar area show shares of a whole.',
  section: 'Chart types',
  tags: ['type', 'bar', 'line', 'radar', 'doughnut', 'polarArea'],
  docs: [
    'repo/docs/configuration/index.md',
    'repo/docs/charts/bar.md',
    'repo/docs/charts/line.md',
    'repo/docs/charts/radar.md',
    'repo/docs/charts/doughnut.md',
    'repo/docs/charts/polar.md',
  ],
  provenance: 'pure',
  added: '2026-06-14',
});
