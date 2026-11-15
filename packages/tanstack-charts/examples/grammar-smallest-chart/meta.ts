// tanstack-charts example: Smallest useful chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Smallest useful chart',
  summary:
    'One barY mark with a band scale and a linear scale, reading letter frequencies straight from typed rows with no series wrapper.',
  section: 'Grammar of Graphics',
  tags: ['barY', 'defineChart', 'scaleBand', 'scaleLinear', 'nice'],
  docs: ['repo/docs/concepts/grammar-of-graphics.md', 'repo/docs/guides/tooltips-and-focus.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
