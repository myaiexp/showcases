// observable-plot example: Vector: wind map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector: wind map',
  summary:
    'Wind speed and direction on a grid: the u and v components become rotate (atan2) and length (hypot), and the same speed colours the stroke, so each vector is an arrow in a field.',
  section: 'Mark: Vector',
  tags: ['vector', 'rotate', 'length', 'stroke', 'color'],
  docs: ['repo/docs/marks/vector.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
