// aframe example: componentinitialized and componentremoved events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'componentinitialized and componentremoved events',
  summary:
    'Adding a light with setAttribute emits componentinitialized with the component name; removeAttribute emits componentremoved. The board logs both as the light toggles on a spinning octahedron.',
  section: 'Core API',
  tags: ['componentinitialized', 'componentremoved', 'setAttribute', 'removeAttribute', 'light'],
  docs: ['repo/docs/core/entity.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
