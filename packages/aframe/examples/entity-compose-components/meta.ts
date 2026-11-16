// aframe example: Entity: plug geometry, material and light into an empty entity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Entity: plug geometry, material and light into an empty entity',
  summary:
    'An empty <a-entity> renders nothing; setAttribute plugs in geometry and material for a red box, then a light component makes it emit light. Step through it with the button, or watch a card cycle.',
  section: 'Core API',
  tags: ['a-entity', 'geometry', 'material', 'light', 'setAttribute', 'removeAttribute'],
  docs: ['repo/docs/core/entity.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
