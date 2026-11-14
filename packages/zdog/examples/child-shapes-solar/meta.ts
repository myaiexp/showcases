// Zdog example: Child shapes orrery, sun, planet and moon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Child shapes: orrery',
  summary:
    'A sun, a planet and a moon, where each one is added to the one before it. Turning an invisible pivot carries everything added to it, so the moon rides along with the planet without any extra maths. Tilt the sun and the whole system tilts with it.',
  section: 'Modeling',
  tags: ['addTo', 'Anchor', 'translate', 'rotate', 'Shape', 'Ellipse'],
  docs: [
    'repo/modules/docs/modeling-concepts.hbs',
    'repo/modules/docs/child-shapes-add-to.hbs',
    'repo/modules/docs/api-anchor.hbs',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
