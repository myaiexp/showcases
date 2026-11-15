// tanstack-charts example: Bubble chart with r and rScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bubble chart with r and rScale',
  summary:
    'Giving r a channel makes a bubble chart, and rScale maps the raw value to pixels. A d3 square-root scale with a [3, 16] pixel range makes bubble area, not radius, follow the value. The select compares it with the raw value used directly as pixels.',
  section: 'Dot and Hexagon Marks',
  tags: ['dot', 'r', 'rScale', 'scaleSqrt'],
  docs: ['repo/docs/reference/marks/dot-and-hexagon.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
