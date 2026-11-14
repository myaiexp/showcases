// Zdog example: Polygon badges, a medal that goes from a triangle to an octagon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polygon badges',
  summary:
    'A medal on a ribbon whose shape changes with one number. A Zdog Polygon is a regular polygon set by its radius and its sides, so a triangle, a hexagon and an octagon are the same call with a different count. Slide the sides, or watch it count up.',
  section: 'Shapes',
  tags: ['Polygon', 'radius', 'sides', 'Rect', 'fill'],
  docs: ['repo/modules/docs/shapes-basic.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
