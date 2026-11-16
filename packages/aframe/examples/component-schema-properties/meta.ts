// aframe example: Schema: a component's properties, defaults and types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Schema: a component\'s properties, defaults and types',
  summary:
    'The docs\' bar component has a colour with an inferred type and an int size. Markup and setAttribute both parse into this.data; the update handler sizes and colours a sphere, and the board shows the data each time.',
  section: 'Core API',
  tags: ['registerComponent', 'schema', 'this.data', 'int', 'update'],
  docs: ['repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
