// tanstack-charts example: Bubble area, not radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bubble area, not radius',
  summary:
    'Bubbles for 1x, 2x, 4x and 8x. A linear radius scale makes 8x cover 64 times the area; a sqrt scale makes the area proportional.',
  section: 'Choosing a Chart',
  tags: ['dot', 'rScale', 'scaleSqrt'],
  docs: ['repo/docs/guides/choosing-a-chart.md', 'repo/docs/concepts/data-and-channels.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
