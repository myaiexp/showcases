// aframe example: Entity-component-system: vehicles composed from reusable components
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Entity-component-system: vehicles composed from reusable components',
  summary:
    'A body entity becomes a car (wheels with count 4), a motorcycle (count 2), a boat (no wheels) or an airplane (a wing) by adding and removing components that know nothing about each other.',
  section: 'Introduction',
  tags: ['composition', 'registerComponent', 'setAttribute', 'removeAttribute', 'setObject3D'],
  docs: ['repo/docs/introduction/entity-component-system.md', 'repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
