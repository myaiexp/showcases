// Zdog example: Inherited transforms, a robot arm with three joints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Inherited transforms: robot arm',
  summary:
    'A robot arm with shoulder, elbow and wrist. Each joint is an invisible pivot added to the part before it, so turning the shoulder swings the whole arm and the wrist angle stacks on top of the elbow. Rotations add up down the chain; that is how Zdog builds jointed models.',
  section: 'Modeling',
  tags: ['Anchor', 'addTo', 'rotate', 'translate', 'Shape', 'Cylinder'],
  docs: ['repo/modules/docs/modeling-concepts.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
