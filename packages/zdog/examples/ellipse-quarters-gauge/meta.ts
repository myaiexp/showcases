// Zdog example: Quarter gauge, an Ellipse ring that fills one quarter at a time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quarter gauge',
  summary:
    'A progress dial that charges from a quarter to a full ring. The arc is an Ellipse with its quarters option set to 1, 2, 3 or 4: it starts at the top and runs clockwise. A second slider sets width and height separately, turning the circle into an oval.',
  section: 'Shapes',
  tags: ['Ellipse', 'quarters', 'width', 'height', 'updatePath', 'stroke'],
  docs: ['repo/modules/docs/shapes-basic.hbs', 'repo/modules/docs/api-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
