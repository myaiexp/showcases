// aframe example: updateSchema: change a schema when a property changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'updateSchema: change a schema when a property changes',
  summary:
    'Like geometry with its primitive property, a shape component calls extendSchema from updateSchema so kind: ring gains an inner radius and kind: cone gains an edge count. The board lists the schema\'s keys after each switch.',
  section: 'Core API',
  tags: ['updateSchema', 'extendSchema', 'oneOf', 'dynamic schema'],
  docs: ['repo/docs/core/component.md', 'repo/docs/components/geometry.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
