// Zdog example: Z-fighting, shapes that pop over each other
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Z-fighting',
  summary:
    'Two rings of a chain overlapping in the same space. Zdog draws whole shapes in depth order rather than doing real 3D collisions, so as the pair turns the rings swap which one is in front, with a visible pop. The docs say to embrace it: it is part of the hand-made look.',
  section: 'Extras',
  tags: ['Ellipse', 'stroke', 'rotate', 'translate'],
  docs: ['repo/content/extras.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
