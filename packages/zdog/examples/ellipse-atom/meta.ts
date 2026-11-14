// Zdog example: Atom orbits, three tilted Ellipse rings with electrons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Atom orbits',
  summary:
    'An atom with three orbit rings and an electron on each. A ring is an Ellipse with a diameter; rotating it a quarter turn about y turns it from facing you to standing on edge, and tilting its parent anchor fans the three rings out. Resize the orbits with the slider.',
  section: 'Shapes',
  tags: ['Ellipse', 'diameter', 'rotate', 'Anchor', 'updatePath'],
  docs: ['repo/modules/docs/shapes-basic.hbs', 'repo/modules/docs/api-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
