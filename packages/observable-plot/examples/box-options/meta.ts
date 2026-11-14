// observable-plot example: Box: fill and stroke options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Box: fill and stroke options',
  summary:
    'The box options restyle the underlying rule, bar, tick and dot: fill and fillOpacity for the bar, stroke and strokeWidth for the rest, and r for the outliers.',
  section: 'Mark: Box',
  tags: ['boxX', 'fill', 'fillOpacity', 'stroke', 'strokeWidth', 'r'],
  docs: ['repo/docs/marks/box.md', 'repo/docs/data/morley.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
