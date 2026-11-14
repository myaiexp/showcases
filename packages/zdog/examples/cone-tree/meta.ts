// Zdog example: Cone tree, a Christmas tree of stacked Cones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cone tree',
  summary:
    'A Christmas tree made of stacked Cones with twinkling baubles. A Cone is set by its diameter and length and points toward you by default, so a quarter turn stands it up. Choose how many tiers the tree has.',
  section: 'Shapes',
  tags: ['Cone', 'diameter', 'length', 'backface', 'Cylinder', 'rotate'],
  docs: ['repo/modules/docs/shapes-composite.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
