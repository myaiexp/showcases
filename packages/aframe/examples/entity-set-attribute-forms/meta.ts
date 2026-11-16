// aframe example: setAttribute forms: object, string, single property and plain attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'setAttribute forms: object, string, single property and plain attributes',
  summary:
    'Steps through the ways the docs call setAttribute on one box: an object for a single-property component, an object or string for several properties, a property name plus value, and a plain attribute like visible.',
  section: 'Core API',
  tags: ['setAttribute', 'position', 'geometry', 'material', 'visible'],
  docs: ['repo/docs/core/entity.md', 'repo/docs/introduction/javascript-events-dom-apis.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
