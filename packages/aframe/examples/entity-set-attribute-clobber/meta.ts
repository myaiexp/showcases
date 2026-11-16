// aframe example: setAttribute with clobber: true replaces every property
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'setAttribute with clobber: true replaces every property',
  summary:
    'A cylinder keeps its height when setAttribute passes only a new radius, but a third argument of true resets unspecified properties to their defaults. The board shows the geometry after each call.',
  section: 'Core API',
  tags: ['setAttribute', 'clobber', 'geometry', 'getAttribute'],
  docs: ['repo/docs/core/entity.md', 'repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
