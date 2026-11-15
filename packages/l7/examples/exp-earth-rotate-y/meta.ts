// l7 example: Earth rotateY
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Earth rotateY',
  summary:
    'scene.map.rotateY({ option: { force, reg } }) turns the globe: reg is the step (a ratio of the unit rotation), and with force false the call loses to the pointer, so dragging the globe stops the spin.',
  section: 'Experiment',
  tags: ['Earth', 'rotateY', 'force', 'reg', 'EarthLayer'],
  docs: [
    'repo/site/docs/api/experiment/earth.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
